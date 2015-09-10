'use strict';

eventsApp.controller('EventController', function EventController($scope) {
	$scope.event = {
		name: 'Learning Angular',
		imageUrl: 'img/angularjs-logo.png',
		date: 1359781015626,
		time: '10:30 am',
		location: {
			address: 'Google Headquarters',
			city: 'Mountain View',
			province: 'CA'
		},
		sessions: [{
			name: 'Directives Masterclass',
			creatorName: 'Bob Smith',
			duration: 1,
			level: 'Advanced',
			abstract: 'In this session you will learn the ins and outs of directives',
			upVoteCount: 0
		}, {
			name: 'Scopes for fun and profit',
			creatorName: 'John Doe',
			duration: 2,
			level: 'Introductory',
			abstract: 'This session will take a closer look at scopes.',
			upVoteCount: 0
		}, {
			name: 'Well Behaved Controllers',
			creatorName: 'Jane Doe',
			duration: 4,
			level: 'Intermediate',
			abstract: 'Controllers are the beginning of everything Angular does.',
			upVoteCount: 0
		}]
	};

	$scope.downVoteSession = function(session) {
		session.upVoteCount--;
	};

	$scope.upVoteSession = function(session) {
		session.upVoteCount++;
	};
});
