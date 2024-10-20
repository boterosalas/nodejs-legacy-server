const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { roleIsValid, emailIsValid, userExistsById } = require('../helpers/db-validators');
const {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
} = require('../controllers/users');

const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('role').custom(roleIsValid),
    check('email', 'Email is required').isEmail(),
    check('email').custom(emailIsValid),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    validateFields
], usersPost);

router.put('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(roleIsValid),
    validateFields
], usersPut);

router.patch('/', usersPatch);

router.delete('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(userExistsById),
    validateFields
], usersDelete);

module.exports = router;
// module.exports = router