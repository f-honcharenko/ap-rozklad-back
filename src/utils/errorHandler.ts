export async function errorHandler(err, req, res, next) {
    try {
        const responce = await err;
        return res.status(responce.status).json(responce.data);
    } catch (error) {
        return res.status(500).json({msg:'Непредвиденная ошибка сервера',err:error});
    }
}