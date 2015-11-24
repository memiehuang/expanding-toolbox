
angular.module('BudgetApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('budget', {
                url: '/budget',
                templateUrl: 'views/budget.html',
                controller: 'BudgetController'
            })

            .state('reimbursement', {
                url: '/budget/reimbursement',
                templateUrl: 'views/reimbursement.html',
                controller: 'ReimbursementController'
            });

        //default if something weird is typed in
        $urlRouterProvider.otherwise('/budget');
    })

    .controller('BudgetController', function($scope){

    })

    .controller('ReimbursementController', function($scope){
        $scope.user = {};
    });

