/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var GoogleAuth = require('google-auth-library');
var CLIENT_ID = sails.config.keys.GOOGLE_CLIENT_ID

module.exports = {
    'loginStatus': (req, res) => {
        var user = req.session.user
        res.json({user: user})
    },
    'logout': (req, res) => {
        req.session.user = {}
        res.json({user: false})
    },
    'authenticate': (req, res) => {
        try {
            token = req.body.token
            var auth = new GoogleAuth;
            var client = new auth.OAuth2(CLIENT_ID, '', '');
            client.verifyIdToken(
                token,
                CLIENT_ID,
                async function(e, login) {
                    if (e) {
                        return res.json({error: e})
                    }
                    var payload = login.getPayload();
                    var userid = payload['sub'];
                    var domain = payload['hd'];
                    if (domain !== 'iitpkd.ac.in' && domain !== 'smail.iitpkd.ac.in') {
                        return res.json({error: 'Not an IIT PKD acccount.', domain: domain})
                    }
                    createCriteria = {
                        name: payload.name,
                        email: payload.email,
                        type: 'user'
                    }
                    findCriteria = {
                        email: payload.email
                    }
                    var user = await User.findOrCreate(findCriteria, createCriteria)
                    req.session.user = user
                    res.json({user: user})
                }
            );
        } catch (e) {
            res.json({error: e})
        }
    },
    'create': async (req, res) => {
        try {
            var data = {
                name: req.body.name,
                email: req.body.email,
                type: 'user'
            }
            var user = await User.create(data)
            var groupCodes = req.body.groupCodes
            var validGroups = await Group.find({code: groupCodes})
            user.groupList.add(validGroups)
            user.save((e) => {
                if (e) {
                    User.destroy({id: user.id})
                    throw Error(e)
                } else {
                    res.json({status: true})
                }
            })
        } catch (e) {
            console.log(e);
            res.json({error: e})
        }
    },
    'promote': async (req, res) => {
        try {
            promoteEmail = req.body.promoteEmail
            var user = User.findOne({email: promoteEmail})
            if (user.type == 'admin') {
                return res.json({error: 'Can\'t promote Admin'})
            }
            var data = {
                type: 'owner'
            }
            update = await User.update({email: promoteEmail}, data)
            res.json({promoted: true})
        } catch (e) {
            console.log(e);
            res.json({error: e})
        }
    },
    'demote': async (req, res) => {
        try {
            demoteEmail = req.body.demoteEmail
            var user = User.findOne({email: demoteEmail})
            if (user.type == 'admin') {
                return res.json({error: 'Can\'t demote Admin'})
            }
            var data = {
                type: 'user'
            }
            update = await User.update({email: demoteEmail}, data)
            res.json({demoted: true})
        } catch (e) {
            console.log(e);
            res.json({error: e})
        }
    },
    'getTypes': async (req, res) => {
        try {
            var type = req.params.type
            var typeUsers = await User.find({type: type})
            res.json({typeUsers: typeUsers})
        } catch (e) {
            console.log(e);
            res.json({error: e})
        }
    },
};
