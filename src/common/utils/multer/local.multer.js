import multer from 'multer'
import {randomUUID} from 'node:crypto'
import { BadRequestException } from '../../exeptions/index.js';
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileTypeFromBuffer } from 'file-type';







export const fileValidation = {
    image: ["image/jpg", "image/jpeg", "image/png"],
    files: ["application/json", "application/pdf"],
};

export const localFileUpload = ({ fileSize = 5 } = {}) => {
    const storage = multer.memoryStorage();
    return multer({ 
        storage,
        limits: { fileSize: fileSize * 1024 * 1024 }
    });
};


export const processFile = async ({ customPath = "general", validation = [], file }) => {
    const result = await fileTypeFromBuffer(file.buffer);
    console.log({ result, file });

    if (!result || !validation.includes(result.mime)) {
        throw BadRequestException("Invalid file format");
    }

    const customFolderPath = resolve(`./uploads/${customPath}`);
    await mkdir(customFolderPath, { recursive: true });
    const uniqueFilePath = `/uploads/${customPath}/${randomUUID()}.${result.ext}`;
    
    await writeFile(resolve(`./${uniqueFilePath}`), file.buffer);
    return uniqueFilePath;
};

export const processArray = async ({ customPath, validation = [], files }) => {
    console.log("IN ARRAY");
    console.log({ files });

    const assets = [];
    for (const file of files) {
        const path = await processFile({ customPath, validation, file });
        assets.push(path);
    }
    return assets;
};

export const processFields = async ({ customPath, validation = [], files }) => {
    console.log(Object.keys(files));
    const assets = [];

    for (const field of Object.keys(files)) {
        const paths = await processArray({ customPath, validation, files: files[field] });
        assets.push({ key: field, paths });
    }

    console.log(assets);
    return assets;
};

export const localMulterMiddleware = ({ multerMiddleware, validation = [], customPath = "general" }) => {
    return async (req, res, next) => {

        multerMiddleware(req, res, async (error) => {
            if (error) {
                return next(error);
            }

            try {
                if (req.file) {
                    req.file.path= await processFile({ customPath, validation, file: req.file });
                }

                if (req.files?.length) {
                    const paths= await processArray({ customPath, validation, files: req.files });
                    req.files.push(paths)
                } else if (req.files && typeof req.files == "object" && Object.keys(req.files)?.length) {
                    const paths = await processFields({ customPath, validation, files: req.files });
                    req.files.push(paths)
                }

                next();
            } catch (error) {
                next(error);
            }
        });
    };
};







// export const localFileUpload = ()=>{

//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             console.log("file",file)
//             cb(null, './uploads')
//         },
//         filename: function (req, file, cb) {
//             console.log({file});
//             cb(null, randomUUID() + '-' + file.originalname)
//         }

//     })
//     return multer({storage})
// }

/*import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { fileTypeFromBuffer } from 'file-type';
import multer from 'multer';
import { BadRequestException } from '../../../common/exceptions/error.exception.js';

export const fileValidation = {
    image: ["image/jpg", "image/jpeg", "image/png"],
    files: ["application/json", "application/pdf"],
};

export const localFileUpload = () => {
    const storage = multer.memoryStorage();
    return multer({ storage });
};

export const processFile = async ({ validation = [], file }) => {
    const result = await fileTypeFromBuffer(file.buffer);
    console.log({ result, file });

    if (!result || !validation.includes(result.mime)) {
        throw BadRequestException("Invalid file format");
    }

    const filePath = resolve(`./uploads/${randomUUID()}.${result.ext}`);
    await writeFile(filePath, file.buffer);
    return filePath;
};

export const processArray = async ({ validation = [], files }) => {
    const assets = [];
    for (const file of files) {
        const path = await processFile({ validation, file });
        assets.push(path);
    }
    return assets;
};

export const processFields = async ({ validation = [], files }) => {
    console.log(Object.keys(files));
    const assets = [];

    for (const field of Object.keys(files)) {
        const paths = await processArray({ validation, files: files[field] });
        assets.push({ key: field, paths });
    }

    console.log(assets);
    return assets;
};

export const multerUpload = ({ validation = [] }) => {
    return async (req, res, next) => {
        console.log({ fields: req.files });

        if (req.file) {
            await processFile({ validation, file: req.file });
        }

        if (req.files?.length) {
            console.log("in");
            await processArray({ validation, files: req.files });
        } else if (req.files && typeof req.files == "object" && Object.keys(req.files)?.length) {
            console.log({ here: "jjj" });
            await processFields({ validation, files: req.files });
        }

        next();
    };
};









export const localMulterMiddleware = ({ multerMiddleware, validation = [] }) => {
    return async (req, res, next) => {
        console.log(multerMiddleware);

        multerMiddleware(req, res, async (error) => {
            if (error) {
                return next(error);
            }

            try {
                if (req.file) {
                    await processFile({ validation, file: req.file });
                }

                if (req.files?.length) {
                    console.log("in");
                    await processArray({ validation, files: req.files });
                } else if (req.files && typeof req.files == "object" && Object.keys(req.files)?.length) {
                    console.log({ here: "jjj" });
                    await processFields({ validation, files: req.files });
                }

                next();
            } catch (error) {
                next(error);
            }
        });
    };
};






/// alllllllllll 



import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { fileTypeFromBuffer } from 'file-type';
import multer from 'multer';
import { BadRequestException } from '../../../common/exceptions/error.exception.js';

export const fileValidation = {
    image: ["image/jpg", "image/jpeg", "image/png"],
    files: ["application/json", "application/pdf"],
};

export const localFileUpload = () => {
    const storage = multer.memoryStorage();
    return multer({ storage });
};

export const processFile = async ({ validation = [], file }) => {
    try {
        const result = await fileTypeFromBuffer(file.buffer);
        console.log({ result, file });

        if (!result || !validation.includes(result.mime)) {
            throw BadRequestException("Invalid file format");
        }

        const filePath = resolve(`./uploads/${randomUUID()}.${result.ext}`);
        await writeFile(filePath, file.buffer);
        return filePath;
    } catch (error) {
        throw error;
    }
};

export const processArray = async ({ validation = [], files }) => {
    try {
        const assets = [];
        for (const file of files) {
            const path = await processFile({ validation, file });
            assets.push(path);
        }
        return assets;
    } catch (error) {
        throw error;
    }
};

export const processFields = async ({ validation = [], files }) => {
    try {
        console.log(Object.keys(files));
        const assets = [];

        for (const field of Object.keys(files)) {
            const paths = await processArray({ validation, files: files[field] });
            assets.push({ key: field, paths });
        }

        console.log(assets);
        return assets;
    } catch (error) {
        throw error;
    }
};

export const localMulterMiddleware = ({ multerMiddleware, validation = [] }) => {
    return async (req, res, next) => {
        console.log(multerMiddleware);

        multerMiddleware(req, res, async (error) => {
            if (error) {
                return next(error);
            }

            try {
                if (req.file) {
                    await processFile({ validation, file: req.file });
                }

                if (req.files?.length) {
                    console.log("in");
                    await processArray({ validation, files: req.files });
                } else if (req.files && typeof req.files == "object" && Object.keys(req.files)?.length) {
                    console.log({ here: "jjj" });
                    await processFields({ validation, files: req.files });
                }

                next();
            } catch (error) {
                next(error);
            }
        });
    };
};



final code 

import { resolve } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { fileTypeFromBuffer } from 'file-type';
import multer from 'multer';
import { BadRequestException } from '../../../common/exceptions/error.exception.js';

export const fileValidation = {
    image: ["image/jpg", "image/jpeg", "image/png"],
    files: ["application/json", "application/pdf"],
};

export const localFileUpload = () => {
    const storage = multer.memoryStorage();
    return multer({ storage });
};

export const processFile = async ({ validation = [], file }) => {
    const result = await fileTypeFromBuffer(file.buffer);
    console.log({ result, file });

    if (!result || !validation.includes(result.mime)) {
        throw BadRequestException("Invalid file format");
    }

    const filePath = resolve(`./uploads/${randomUUID()}.${result.ext}`);
    await writeFile(filePath, file.buffer);
    return filePath;
};

export const processArray = async ({ validation = [], files }) => {
    const assets = [];
    for (const file of files) {
        const path = await processFile({ validation, file });
        assets.push(path);
    }
    return assets;
};

export const processFields = async ({ validation = [], files }) => {
    console.log(Object.keys(files));
    const assets = [];

    for (const field of Object.keys(files)) {
        const paths = await processArray({ validation, files: files[field] });
        assets.push({ key: field, paths });
    }

    console.log(assets);
    return assets;
};

export const localMulterMiddleware = ({ multerMiddleware, validation = [] }) => {
    return async (req, res, next) => {
        console.log(multerMiddleware);

        multerMiddleware(req, res, async (error) => {
            if (error) {
                return next(error);
            }

            try {
                if (req.file) {
                    await processFile({ validation, file: req.file });
                }

                if (req.files?.length) {
                    console.log("in");
                    await processArray({ validation, files: req.files });
                } else if (req.files && typeof req.files == "object" && Object.keys(req.files)?.length) {
                    console.log({ here: "jjj" });
                    await processFields({ validation, files: req.files });
                }

                next();
            } catch (error) {
                next(error);
            }
        });
    };
};

*/



