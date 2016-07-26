var router = require('express').Router();
var db = require('../../db');
var User = db.model('user');

//<-------- another solution to error handling plus making our routers lean -------->//
// router.param('id', function (req, res, next, id) {
//   User.findById(id)
//   .then(function (user) {
//     if (user) {
//       req.user = user;
//       next();
//     } else {
//       throw HttpError(404);
//     }
//   })
//   .catch(next);
// });


// Get all users
router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => res.json(users))
        .catch(next);
});

// Get one user
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
        .then(user => {
            if (!user) res.status(404).send('No user found')
            else res.json(user)
        })
        .catch(next)
})

// Find or create one user
router.post('/', (req, res, next) => {
    User.findOrCreate(req.body)
        .spread((user, created) => {
            if (!created) res.status(302).json(user);
            else res.status(201).json(user);
        })
        .catch(next);
})

// Updating user information
// Test this route to make sure the
// updated user is returned
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    User.findById(id)
        .then(user => {
            if (!user) res.status(404).send('No user found')
            else return user.update(req.body);
        })
        .then(user => res.json(user))
        .catch(next);
})

// Delete a user
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
  .then(user => {
    if (!user) res.status(404).send('No user found')
    else return user.destroy()
  })
  .then(() => res.status(204).send('User was deleted'))
  .catch(next);

  // A different methodology, perhaps more performant?
  // User.destroy({where: {id: id}})
  // .then(function () {
  //   res.status(204).send('user was deleted')
  // })
  // .catch(next);

});

module.exports = router;

