import multer from 'multer';
import { nanoid } from 'nanoid';
import fs from 'fs';
import moment from 'moment';

export const generateRandomString = (length: number, options?: { type?: 'char' | 'number' }) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if (options && options.type) {
        switch (options.type) {
            case 'char':
                characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                break;
            case 'number':
                characters = '0123456789';
        }
    }
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

interface Tree {
    _id: any;
    children: Tree[];
    [key: string]: any;
}
interface FlatObj {
    parent?: any;
    _id: any;
    [key: string]: any;
}

/**
 * Convert materialized path array into tree structure
 * @param arr An array containing child nodes that contain reference to the parent node (parent reference)
 */
export const flatToTree = (arr: FlatObj[]) => {
    const nodesWithNoParent = arr.filter(obj => !obj.parent);
    const treeArr: Tree[] = [];
    for (const node of nodesWithNoParent) {
        const recursiveAddChild = (obj: Tree) => {
            // find children of the parent
            const children = arr.filter(val => String(val.parent) === String(obj._id));
            for (const child of children) {
                const childObj: Tree = {
                    ...child,
                    children: []
                };
                // add children of the child node
                obj.children.push(childObj);
                recursiveAddChild(childObj);
            }
            arr = arr.filter(val => String(val._id) !== String(obj._id));
        };
        const tree: Tree = {
            ...node,
            children: []
        };

        // add children for nodes with no parents
        recursiveAddChild(tree);
        treeArr.push(tree);
    }

    return treeArr;
};

export const capitalize = (word: string) => {
    if (!word || !word.length) {
        return '';
    }
    return word[0].toUpperCase() + word.slice(1);
};

/**
 * sleep simulation
 * @param time time in ms
 */
export const sleep = (time: number) => {
    return new Promise(res => setTimeout(res, time));
};


export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const name = req.body.name ? req.body.name : '';
        const path = `./public/uploads/${req.body.owner}/${name}`;
        fs.mkdirSync(path, { recursive: true });
        return cb(null, path);
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        return cb(null, nanoid(6) + file.originalname);
    }
});

export const isLinkExpired = (expiryDate: string): boolean => {
    const expiryDateM = moment.utc(expiryDate);

    const isExpired = moment.utc().isAfter(expiryDateM);
    return isExpired;
};

export const PASSWORD_REGEX =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const generateInvoice = (invoiceId: number, name: string) => {
    const clean = name.replace(/\s+/g, "");

    const length = clean.length;

    if (length === 0) return "";
    if (length === 1) {
        const char = clean[0].toUpperCase();
        return char + char + char;
    }
    if (length === 2) {
        return clean[0].toUpperCase() + clean[0].toUpperCase() + clean[1].toUpperCase();
    }

    const first = clean[0].toUpperCase();
    const middle = clean[Math.floor(length / 2)].toUpperCase();
    const last = clean[length - 1].toUpperCase();

    return `${first}${middle}${last}-${invoiceId}`;
}