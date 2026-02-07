// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title USDCPaymentProcessor
 * @dev Handles USDC payments for cross-chain NFT minting
 * @notice This contract is deployed on each chain where USDC payments are accepted
 * 
 * CROSS-CHAIN FLOW:
 * 1. User pays USDC on Chain A (Ethereum, Base, Polygon, etc.)
 * 2. Backend monitors this contract for PaymentReceived events
 * 3. Backend calls mintPredefined() on Pentagon Chain NFT contract
 * 4. User receives NFT on Pentagon Chain without bridging
 * 
 * This pattern enables "Pay anywhere, mint anywhere" functionality.
 */
contract USDCPaymentProcessor is AccessControl, ReentrancyGuard {
    
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    
    // USDC contract address (chain-specific)
    IERC20 public immutable usdc;
    
    // Payment recipient
    address public treasury;
    
    // Mint price in USDC (6 decimals)
    uint256 public mintPrice = 1_000_000; // 1 USDC
    
    // Track processed payments to prevent double-minting
    mapping(bytes32 => bool) public processedPayments;
    
    // Payment record for verification
    struct Payment {
        address payer;
        uint256 amount;
        uint256 timestamp;
        uint256 characterType;
        bool processed;
    }
    
    mapping(bytes32 => Payment) public payments;
    
    // Events
    event PaymentReceived(
        bytes32 indexed paymentId,
        address indexed payer,
        uint256 amount,
        uint256 characterType,
        uint256 timestamp
    );
    
    event PaymentProcessed(
        bytes32 indexed paymentId,
        address indexed payer,
        uint256 mintedTokenId
    );
    
    event TreasuryUpdated(address oldTreasury, address newTreasury);
    event MintPriceUpdated(uint256 oldPrice, uint256 newPrice);

    /**
     * @dev Constructor
     * @param _usdc USDC token address for this chain
     * @param _treasury Address to receive payments
     */
    constructor(address _usdc, address _treasury) {
        require(_usdc != address(0), "Invalid USDC address");
        require(_treasury != address(0), "Invalid treasury address");
        
        usdc = IERC20(_usdc);
        treasury = _treasury;
        
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(OPERATOR_ROLE, msg.sender);
    }

    /**
     * @dev Pay for NFT mint with USDC
     * @param characterType Type of character to mint (0: Warrior, 1: Mage, 2: Rogue)
     * @return paymentId Unique identifier for this payment
     * 
     * @notice User must approve USDC spend before calling this
     * @notice Backend monitors PaymentReceived events to trigger minting
     */
    function payForMint(uint256 characterType) external nonReentrant returns (bytes32) {
        require(characterType <= 2, "Invalid character type");
        
        // Generate unique payment ID
        bytes32 paymentId = keccak256(abi.encodePacked(
            msg.sender,
            block.timestamp,
            block.number,
            characterType
        ));
        
        require(!processedPayments[paymentId], "Payment already exists");
        
        // Transfer USDC from user to treasury
        require(
            usdc.transferFrom(msg.sender, treasury, mintPrice),
            "USDC transfer failed"
        );
        
        // Record payment
        payments[paymentId] = Payment({
            payer: msg.sender,
            amount: mintPrice,
            timestamp: block.timestamp,
            characterType: characterType,
            processed: false
        });
        
        emit PaymentReceived(
            paymentId,
            msg.sender,
            mintPrice,
            characterType,
            block.timestamp
        );
        
        return paymentId;
    }

    /**
     * @dev Mark payment as processed after NFT is minted (operator only)
     * @param paymentId The payment to mark as processed
     * @param mintedTokenId The token ID that was minted on Pentagon Chain
     * 
     * @notice Called by backend after successful mint on Pentagon Chain
     */
    function markProcessed(bytes32 paymentId, uint256 mintedTokenId) 
        external 
        onlyRole(OPERATOR_ROLE) 
    {
        require(!processedPayments[paymentId], "Already processed");
        require(payments[paymentId].payer != address(0), "Payment not found");
        
        processedPayments[paymentId] = true;
        payments[paymentId].processed = true;
        
        emit PaymentProcessed(paymentId, payments[paymentId].payer, mintedTokenId);
    }

    /**
     * @dev Get payment details
     */
    function getPayment(bytes32 paymentId) external view returns (
        address payer,
        uint256 amount,
        uint256 timestamp,
        uint256 characterType,
        bool processed
    ) {
        Payment memory p = payments[paymentId];
        return (p.payer, p.amount, p.timestamp, p.characterType, p.processed);
    }

    /**
     * @dev Update treasury address (admin only)
     */
    function setTreasury(address newTreasury) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newTreasury != address(0), "Invalid address");
        address old = treasury;
        treasury = newTreasury;
        emit TreasuryUpdated(old, newTreasury);
    }

    /**
     * @dev Update mint price (admin only)
     */
    function setMintPrice(uint256 newPrice) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newPrice > 0, "Price must be > 0");
        uint256 old = mintPrice;
        mintPrice = newPrice;
        emit MintPriceUpdated(old, newPrice);
    }

    /**
     * @dev Emergency withdraw (admin only)
     * @notice For recovering stuck tokens, not normal operation
     */
    function emergencyWithdraw(address token) external onlyRole(DEFAULT_ADMIN_ROLE) {
        IERC20(token).transfer(
            treasury,
            IERC20(token).balanceOf(address(this))
        );
    }
}
