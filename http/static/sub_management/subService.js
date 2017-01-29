﻿angular.module('webtools').service('subService', ['$http', 'subModel', 'webtoolsModel', 'webtoolsService', function ($http, subModel, webtoolsModel, webtoolsService) {
    this.getShows = function (callback) {
        webtoolsModel.subLoading = true;
        $http({
            method: "GET",
            url: webtoolsModel.apiUrl + "?module=pms&function=getSectionsList",
        }).then(function (resp) {
            subModel.shows = [];
            angular.forEach(resp.data, function (media) {
                if (media.type === "movie" || media.type === "show") {
                    media.expanded = false;
                    subModel.shows.push(media);
                }
            });
            if (callback) callback(resp.data);
            webtoolsModel.subLoading = false;
        }, function (errorResp) {
            webtoolsService.log("subService.getShows - Sections could not be loaded!", "Sub", true);
            webtoolsModel.subLoading = false;
        });
    }
}]);