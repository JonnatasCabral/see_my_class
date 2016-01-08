(function () {

  'use strict';

  angular.module('social')
    .controller('RegisterCtrl', RegisterCtrl);

  RegisterCtrl.$inject = ['$meteor', '$state'];

  /**
   * @summary Controller to manage the register of users
   * @class client.auth.controllers.RegisterCtrl
   * @instancename registerCtrl
   */
  function RegisterCtrl ($meteor, $state) {
    var vm = this;

    initialize();
    
    /** Initialize variables of the controller context **/
    function initialize () {

      vm.stateChoices = [
        { label: 'Selecione um estado', value: null },
        { label: 'Acre', value: 'AC' },
        { label: 'Alagoas', value: 'AL' },
        { label: 'Amapá', value: 'AP' },
        { label: 'Amazonas', value: 'AM' },
        { label: 'Bahia', value: 'BA' },
        { label: 'Ceará', value: 'CE' },
        { label: 'Distrito Federal', value: 'DF' },
        { label: 'Espírito Santo', value: 'ES' },
        { label: 'Goiás', value: 'GO' },
        { label: 'Maranhão', value: 'MA' },
        { label: 'Mato Grosso', value: 'MT' },
        { label: 'Mato Grosso do Sul', value: 'MS' },
        { label: 'Minas Gerais', value: 'MG' },
        { label: 'Pará', value: 'PA' },
        { label: 'Paraíba', value: 'PB' },
        { label: 'Paraná', value: 'PR' },
        { label: 'Pernambuco', value: 'PE' },
        { label: 'Piauí', value: 'PI' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Rio Grande do Norte', value: 'RN' },
        { label: 'Rio Grande do Sul', value: 'RS' },
        { label: 'Rondônia', value: 'RO' },
        { label: 'Roraima', value: 'RR' },
        { label: 'Santa Catarina', value: 'SC' },
        { label: 'São Paulo', value: 'SP' },
        { label: 'Sergipe', value: 'SE' },
        { label: 'Tocantins', value: 'TO' },
     ];

      vm.error = '';
      vm.formData = {
        username: '',
        password: '',
        profile: {
          name: '',
          state: null,
        }
      };
    }    

    /**
     * @summary Register a new user with the vm.formData
     * @method register
     * @memberOf client.auth.controllers.RegisterCtrl
     * @instance
     */
    vm.register = function () {
      vm.formData.profile.state = vm.formData.profile.state.value;
      $meteor.createUser(vm.formData)
        .then(registerSuccess, registerFail);
    }


    /**
     * @summary Sends the current user the de initial page
     * @method registerSuccess
     * @memberOf client.auth.controllers.RegisterCtrl
     * @instance
     */
    function registerSuccess (user) {
      $state.go('posts.index');
    }


    /**
     * @summary Show the error message in template
     * @method registerSuccess
     * @memberOf client.auth.controllers.RegisterCtrl
     * @instance
     * @param {string} err - The error message
     */
    function registerFail (err) {
      vm.error = 'Problema com o cadastro - ' + err;
    }

  }

})();