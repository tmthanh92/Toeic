(function () {
    'use strict';
    function UserService($timeout, $filter, $q) {
        UserService.$inject = ['$timeout', '$filter', '$q'];

        var service = {};

        function getUsers() {
            if (!localStorage.users) {
                localStorage.users = JSON.stringify([]);
            }

            return JSON.parse(localStorage.users);
        }

        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getUsers());
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer(), filtered, user;
            filtered  = $filter('filter')(getUsers(), { id: id });
            user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function getByUsername(username) {
            var deferred = $q.defer(), filtered, user;
            filtered = $filter('filter')(getUsers(), { email: username });
            user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        // private functions
        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }

        function Create(user) {
            var deferred = $q.defer(), lastUser;

            // simulate api call with $timeout
            $timeout(function () {
                getByUsername(user.username)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
                        } else {
                            var users = getUsers();

                            // assign id
                            lastUser = users[users.length - 1] || { id: 0 };
                            user.id = lastUser.id + 1;

                            // save to local storage
                            users.push(user);
                            setUsers(users);

                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);

            return deferred.promise;
        }

        function Update(user) {
            var deferred = $q.defer(), users, i;

            users = getUsers();
            for (i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer(), users, i, user;

            users = getUsers();
            for (i = 0; i < users.length; i++) {
                user = users[i];
                if (user.id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = getByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;
    }

    angular
        .module('app')
        .factory('UserService', UserService);

}());