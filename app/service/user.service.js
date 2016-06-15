(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};
        var url_host = 'http://localhost/SeeEnglish/api/';
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.SendContactInfo = SendContactInfo;
        service.Login = Login;
        return service;

        function Login(username,password)
        {
            return $http.post(url_host + 'user/login',{'username':username,'password':password}).then(handleSuccess, handleError('Login failed!'));
        }

        function GetAll() {
            return $http.get('http://localhost:2958/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('http://localhost:2958/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('http://localhost/SeeEnglish/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post('http://localhost/SeeEnglish/api/user/create/', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('http://localhost/SeeEnglish/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('http://localhost:2958/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

        function SendContactInfo(contactUserInfo) {
            return $http.post('http://localhost/SeeEnglish/api/guest', contactUserInfo, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(handleSuccess, handleError('Error creating user'));
        }
    }

})();
