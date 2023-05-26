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
        let num = req.query.num;
        const query = 'SELECT * FROM machine_list LIMIT 25 OFFSET '+ (num-1)*25;
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

    // get machine
    JsonRoutes.add('get', '/api/machinesAll', function (req, res) {
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

    // get one machine
    JsonRoutes.add('get', '/api/editMachines', function (req, res) {
        let id = req.query.id;
        const query = 'SELECT * FROM machine_list WHERE id = '+id;
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
            const values = [data.name, data.ip, data.port, data.status, data.description, data.service_name];
            const query = 'INSERT INTO machine_list (name, ip, port, status, description, service_name) VALUES (?, ?, ?, ?, ?, ?)';
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
            const query = 'UPDATE machine_list SET name ="'+ data.name +'", ip ="'+ data.ip +'", port ="'+ data.port +'", status ="'+data.status+'", description ="'+data.description+'", service_name ="'+data.service_name+'" WHERE id ="'+ data.id+'"';
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
    });

    /**
     * handling logs(table)
    */
    //get logs
    JsonRoutes.add('get', '/api/logs', function (req, res) {
        let num = req.query.num;
        const query = 'SELECT * FROM logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 31 DAY) LIMIT 25 ' + 'OFFSET ' + (num-1)*25;
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
            const values = [data.machine_id, data.server_name, data.ip, data.port, data.service_account, data.status];
            const query = 'INSERT INTO logs (machine_id, server_name, ip, port, service_account, status) VALUES (?, ?, ?, ?, ?, ?)';
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

    //delete logs
    JsonRoutes.add('get', '/api/logs/delete', function (req, res) {
        const query = 'DELETE FROM logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 31 DAY)';
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
    /**
     * handling logs(table)
    */
    //get admin list
    JsonRoutes.add('get', '/api/admin', function (req, res) {
        let num = req.query.num;
        const query = 'SELECT * FROM admin_list LIMIT 25 OFFSET ' + (num-1)*25;
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

    //get admin all list
    JsonRoutes.add('get', '/api/getAlladmin', function (req, res) {
        const query = 'SELECT * FROM admin_list';
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
            const values = [data.name, data.email, data.password, data.sms_number];
            const query = 'INSERT INTO admin_list (name, email, password, sms_number) VALUES (?, ?, ?, ?)';
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
            const query = 'UPDATE admin_list SET name = "'+ data.name +'", email = "'+ data.email +'", password ="'+ data.password +'", sms_number ="'+data.sms_number+'" WHERE id ="'+ data.id+'"';
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
    });
    /**
     * login checking admin
     */
    //email check for login
    JsonRoutes.add('post', '/api/admin/verify/email', function (req, res) {
        jsonParser(req, res, () => {
            const data = req.body;
            const query = 'SELECT * FROM admin_list WHERE email = '+ '"'+ data.email +'"';
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
    });

    /**
     * detail info
     */
    //get detail info one month
    JsonRoutes.add('post', '/api/detail', function (req, res) {
        jsonParser(req, res, () => {
            const id = req.query.machine_id;
            const query = 'SELECT * FROM logs WHERE created_at > DATE_SUB(NOW(), INTERVAL 31 DAY) AND machine_id ="' + id + '"';
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
    });

    /**
     * summery info
     */
    //get summery info one day
    JsonRoutes.add('post', '/api/summery', function (req, res) {
        jsonParser(req, res, () => {
            const id = req.query.machine_id;
            const query = 'SELECT * FROM logs WHERE DATE(created_at) = CURDATE() AND machine_id = "' + id + '"';
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
    }); 
    
    /**
     * frequency
     */
    //update frequency info
    JsonRoutes.add('post', '/api/frequency', function (req, res) {
        jsonParser(req, res, () => {
            const data = req.body;
            const query = 'UPDATE frequency SET mode_b ="'+ data.mode_b +'", mode_s ="'+ data.mode_s +'", start_date ="'+ data.start_date +'", end_date ="'+data.end_date+'", time ="'+data.time_+'", interval_time ="'+data.interval_time+'", day ="'+data.day +'" WHERE id = 1';     
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
    });
    //get frequency info
    JsonRoutes.add('get', '/api/frequency', function (req, res) {
        let num = req.query.num;
        const query = 'SELECT * FROM frequency WHERE id = 1';
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
});