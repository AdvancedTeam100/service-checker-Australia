import { JsonRoutes } from 'meteor/simple:json-routes';
import mysql from 'mysql';
import bodyParser from 'body-parser';

// Initialize body-parser middleware
const jsonParser = bodyParser.json();

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'service_checker'
});


Meteor.startup(() => {
    /**
     * handling machine(table)
    */
    // get machine
    JsonRoutes.add('get', '/api/machines', function (req, res) {
        const query = 'SELECT * FROM machine_list';
        pool.query(query, function (error, results) {
            if (error) {
                return JsonRoutes.sendError(res, {
                    code: '500',
                    message: error
                });
            }
            return JsonRoutes.sendResult(res, {
                data: results
            });
        });
    });

    //add machine
    JsonRoutes.add('post', '/api/machines', function (req, res) {
        jsonParser(req, res, () => {
            const data = req.body;
            const values = [data.name, data.ip, data.port, data.status, data.description, data.service_name, data.database, data.username, data.password, data.created_at, data.updated_at];
            const query = 'INSERT INTO machine_list (name, ip, port, status, description, service_name, database_name, username, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            pool.query(query, values, function (error, results) {
                if (error) {
                    return JsonRoutes.sendError(res, {
                        code: '500',
                        message: error
                    });
                }
                return JsonRoutes.sendResult(res, {
                    data: results
                });
            });
        });
    });

    //delete machine
    JsonRoutes.add('get', '/api/machines/delete', function (req, res) {
        let id = req.query.id;
        const query = 'DELETE FROM machine_list WHERE id = ' + id;
        pool.query(query, function (error, results) {
            if (error) {
                return JsonRoutes.sendError(res, {
                    code: '500',
                    message: error
                });
            }
            return JsonRoutes.sendResult(res, {
                data: results
            });
        });
    });

    //update machine
    JsonRoutes.add('post', '/api/machine/update', function (req, res) {
        jsonParser(req, res, () => {
            const data = req.body;
            const query = 'UPDATE machine_list SET name ='+ data.name +', ip ='+ data.ip +', port ='+ data.port +', status ='+data.status+', description ='+data.description+', service_name ='+data.service_name+', database_name ='+data.database_name+', username = '+data.username+', password = '+data.password+', updated_at ='+data.updated_at+' WHERE id ='+ data.id;
            pool.query(query, values, function (error, results) {
                if (error) {
                    return JsonRoutes.sendError(res, {
                        code: '500',
                        message: error
                    });
                }
                return JsonRoutes.sendResult(res, {
                    data: results
                });
            });
        });
    });

    /**
     * handling logs(table)
    */
    //get logs
    JsonRoutes.add('get', '/api/logs', function (req, res) {
        const query = 'SELECT * FROM logs';
        pool.query(query, function (error, results) {
            if (error) {
                return JsonRoutes.sendError(res, {
                    code: '500',
                    message: error
                });
            }
            return JsonRoutes.sendResult(res, {
                data: results
            });
        });
    });

    //add logs
    JsonRoutes.add('post', '/api/logs', function (req, res) {
        jsonParser(req, res, () => {
            const data = req.body;
            const values = [data.server_name, data.ip, data.port, data.status, data.created_at];
            const query = 'INSERT INTO logs (server_name, ip, port, status, created_at) VALUES (?, ?, ?, ?, ?)';
            pool.query(query, values, function (error, results) {
                if (error) {
                    console.log(error);
                    return JsonRoutes.sendError(res, {
                        code: '500',
                        message: error
                    });
                }
                return JsonRoutes.sendResult(res, {
                    data: results
                });
            });
        });
    });

    //delete logs
    JsonRoutes.add('get', '/api/logs/delete', function (req, res) {
        const query = 'DELETE FROM logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 31 DAY)';
        pool.query(query, function (error, results) {
            if (error) {
                console.log(error);
                return JsonRoutes.sendError(res, {
                    code: '500',
                    message: error
                });
            }
            return JsonRoutes.sendResult(res, {
                data: results
            });
        });
    });
    /**
     * handling logs(table)
    */
    //get admin list
    JsonRoutes.add('get', '/api/admin', function (req, res) {
        const query = 'SELECT * FROM admin_list';
        console.log(query);
        pool.query(query, function (error, results) {
            if (error) {
                return JsonRoutes.sendError(res, {
                    code: '500',
                    message: error
                });
            }
            return JsonRoutes.sendResult(res, {
                data: results
            });
        });
    });

    //add admin list
    JsonRoutes.add('post', '/api/admin', function (req, res) {
        jsonParser(req, res, () => {
            const data = req.body;
            const values = [data.name, data.email, data.password, data.sms_number, data.created_at, data.updated_at];
            const query = 'INSERT INTO admin_list (name, email, password, sms_number, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)';
            pool.query(query, values, function (error, results) {
                if (error) {
                    console.log(error);
                    return JsonRoutes.sendError(res, {
                        code: '500',
                        message: error
                    });
                }
                return JsonRoutes.sendResult(res, {
                    data: results
                });
            });
        });
    });

    //delete admin
    JsonRoutes.add('get', '/api/admin/delete', function (req, res) {
        let id = req.query.id;
        const query = 'DELETE FROM admin_list WHERE id = ' + id;
        pool.query(query, function (error, results) {
            if (error) {
                return JsonRoutes.sendError(res, {
                    code: '500',
                    message: error
                });
            }
            return JsonRoutes.sendResult(res, {
                data: results
            });
        });
    });

    //update admin
    JsonRoutes.add('post', '/api/admin/update', function (req, res) {
        jsonParser(req, res, () => {
            const data = req.body;
            const query = 'UPDATE admin_list SET name ='+ data.name +', email ='+ data.email +', password ='+ data.password +', sms_number ='+data.sms_number+', updated_at ='+data.updated_at+' WHERE id ='+ data.id;
            pool.query(query, values, function (error, results) {
                if (error) {
                    return JsonRoutes.sendError(res, {
                        code: '500',
                        message: error
                    });
                }
                return JsonRoutes.sendResult(res, {
                    data: results
                });
            });
        });
    });
});