const ROUTE = '/rooms'

module.exports = function(app) {
    const router = app.get('express').Router();
    const bookshelf = app.get('bookshelf');
    const Room = bookshelf.model('Rooms');

    router.route('/')
        .get(async (req, res) => {
            try {
                const rooms = await new Room().fetchAll();
                res.json(rooms);
            } catch (error) {
                res.json(error);
            }
        })
        .post(async (req, res) => {
            try {
                res.json(await new Room(req.body).save());
            } catch (error) {
                res.json(error);
            }
        });
    
    router.route('/:id').delete(async (req, res) => {
        try {
            res.json(await new Room().where('id', req.params['id']).destroy());
        } catch (error) {
            res.json(error);
        }
    });

    app.use(ROUTE, router);
}