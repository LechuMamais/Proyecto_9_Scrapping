const cloudinary = require('cloudinary').v2;

const deleteImgCloudinary = (imgUrl) => {
    //----Con los siguientes métodos de JavaScript accederemos a la ruta de la imagen, su nombre, su carpeta y el id con el que se almacena en cloudinary para localizarlo nivel a nivel.
    const imgSplited = imgUrl.split('/')
    const nameSplited = imgSplited[imgSplited.length - 1].split('.')
    const folderSplited = imgSplited[imgSplited.length - 2]
    const public_id = `${folderSplited}/${nameSplited[0]}`;

    //----Con el método destroy localizamos nuestro archivo e imprimimos por callback un console.log indicando que se ha podido destruir correctamente.
    cloudinary.uploader.destroy(public_id, () => {
        console.log('Image delete in cloudinary')
    })
};

module.exports = { deleteImgCloudinary };