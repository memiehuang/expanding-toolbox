
angular.module('BudgetApp', ['ui.router', 'chart.js'])
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
            })

            .state('review', {
                url: '/budget/reimbursement/review',
                templateUrl: 'views/review.html',
                controller: 'ReviewController'
            });

        //default if something weird is typed in
        $urlRouterProvider.otherwise('/budget');
    })

    .config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            colours: ['#FF5252', '#FF8A80'],
            responsive: false
        });
        // Configure all line charts
        ChartJsProvider.setOptions('Line', {
            datasetFill: false
        });
    }])


    .controller('BudgetController', function($scope){

        console.log($scope.officerBudgets);

        $scope.officerBudgets = angular.fromJson(localStorage.getItem('officerBudgets'));


        if($scope.officerBudgets == undefined){
            $scope.officerBudgets = [
                {name: "President", budget: 1000, color: '#FF9999'},
                {name: "VP of Operations", budget: 1200,color: '#ffb366' } ,
                {name: "VP of Finance", budget: 1300, color: '#ffff4d'},
                {name: "VP of Community Relations", budget:5000, color: '#aaff80'},
                {name: "VP of Recruitment Management", budget: 3000, color: '#99ffff'},
                {name: "VP of Recruitment Development", budget: 7000, color: '#3385ff'},
                {name: "VP of Outreach and Advancement", budget: 1500, color: '#7070db'},
                {name: "VP of Public Relations", budget: 2500, color: '#7a00cc'},
                {name: "VP of Membership Development", budget: 7000, color: '#993399'},
                {name: "VP of Administration", budget: 1000, color: '#cc0099'}
            ]
            localStorage.setItem("officerBudgets", angular.toJson($scope.officerBudgets));
        }

        $scope.officers = [];
        $scope.budget = [];

        var idx;
        for(idx = 0; idx < $scope.officerBudgets.length; idx++){
            $scope.officers.push($scope.officerBudgets[idx].name);
            $scope.budget = $scope.budget.concat([
                {value: $scope.officerBudgets[idx].budget,
                 color: $scope.officerBudgets[idx].color}
            ])
            console.log($scope.budget);
        }



    })

    .controller('ReimbursementController', function($scope){
        $scope.user = {};

        $scope.review = {};

        $scope.positions = ['President', 'VP of Operations', 'VP of Finance',
                            'VP of Community Relations', 'VP of Membership Development',
                            'VP of Outreach and Advancement', 'VP of Administration', 'VP of Recruitment Development',
                            'VP of Recruitment Management', 'VP of Public Relations'];

        $scope.checkReview = function(){
            var user = $scope.user;

            $scope.review = {
                name : user.name,
                position : user.position,
                date:  user.date,
                amount : user.amount,
                vendor: user.vendor,
                purpose: user.purpose
            };

            console.log('printInsideFunction: ' + $scope.review);
            localStorage.setItem("review", angular.toJson($scope.review));
        }
    })

    .controller('ReviewController', function($scope){
        $scope.review = angular.fromJson(localStorage.getItem('review')) || [];
        console.log('printInReviewController: ' + $scope.review.name);


        $scope.officerBudgets = angular.fromJson(localStorage.getItem('officerBudgets')) || [];

        $scope.updateBudget = function(){
            $scope.officerBudgets.forEach(function(officer){
                console.log(officer.name);
                console.log($scope.review.position);
                if(officer.name === $scope.review.position){
                    console.log(officer.budget);
                    console.log($scope.review.amount);
                    officer.budget = officer.budget - $scope.review.amount;
                    localStorage.setItem("officerBudgets", angular.toJson($scope.officerBudgets));
                    $scope.success = true;
                }
            });
        };

    });


