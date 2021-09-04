//En desuso ya que se pasa a mongodb
const fs = require("fs");

const readArch = async (arch) => {
    try { 
        const productos = await fs.promises.readFile(arch, 'utf-8');
        if (productos.length > 0) {
            return JSON.parse(productos);
        }
        return [];
    } catch (error) {
        console.error(error);
    }
}

const saveProduct = async (arch, to_save) => {
    try {
        let list_to_save = await readArch(arch);
        list_to_save.push(to_save);
        // console.log('list_to_save', list_to_save);
        let save_str = JSON.stringify(list_to_save);
        await fs.promises.writeFile(arch, save_str);
        console.log('Item saved!');
    } catch (error) {
        console.error(error);
    }
}

const saveList = async (arch, to_save) => {
    try {
        let save_str = JSON.stringify(to_save);
        await fs.promises.writeFile(arch, save_str);
        console.log('File updated!');
    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    saveProduct,
    saveList,
    readArch
}