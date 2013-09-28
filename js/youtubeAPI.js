function YoutubeAPI(container) {
    this._apiKey = 'AIzaSyD3FiWhfk918hI3o6fEB7UbV8VBVgCyrN8';
    this._prefixUrl = 'https://www.googleapis.com/youtube/v3/search?';
    this._container = container;
    this._input = this._container.find('.ipt-search');
    this._submitBtn = this._container.find('.ipt-submit');
    this._minQuery = 3;
}

YoutubeAPI.prototype.getVideos = function (query, callback) {
    var self = this;
    var urlConsulta = self._prefixUrl + 'part=id%2C+snippet&type=video&maxResults=12&q=' + query + '&key=' + self._apiKey;
    //https://www.googleapis.com/youtube/v3/search?part=id%2C+snippet&maxResults=20&q=google&safeSearch=moderate&key=AIzaSyD3FiWhfk918hI3o6fEB7UbV8VBVgCyrN8

    $.ajax({
        type: "GET",
        url: urlConsulta,
        success: function (dados) {
            callback(dados);
        },
        error: function (e) {
            callback('ops!');
        }
    });
};

YoutubeAPI.prototype.getJson = function (callback) {
    var self = this;

    self.listenEvents(function (query) {
        self.getVideos(query, function (dados) {
            callback(dados);
        });
    });
};

YoutubeAPI.prototype.listenEvents = function (callback) {
    var self = this;

    // evento no campo de busca
    self._input.on('keyup', function (e) {
        var query = self._input.val();
        var lengthQuery = query.length;
        var isEnter = e.keyCode === 13 ? true : false;

        if (lengthQuery > self._minQuery) {
            if (isEnter) {
                callback(query);
            }
        }
    });

    // evento no botao de busca
    self._submitBtn.on('click', function () {
        var query = self._input.val();
        var lengthQuery = query.length;

        if (lengthQuery > self._minQuery) {
            callback(query);
        }
    });
};






function YoutubeAPIModal(container) {
    this._container = container;
    this._iframe = this._container.find('iframe');
    this._isVisible = false;
    this._srcInicio = 'http://www.youtube.com/embed/';
    this._srcFinal = '?rel=0&autoplay=1';
    // <iframe width="420" height="315" src="//www.youtube.com/embed/p5_fFxz8_mQ" frameborder="0" allowfullscreen></iframe>
}

YoutubeAPIModal.prototype.show = function (videoId) {
    /*
	** Mostra o modal do video
	*/

    var self = this;

    self.setVideoId(videoId);
    self._container.show();
    self._isVisible = true;
};

YoutubeAPIModal.prototype.hide = function () {
    /*
	** Esconde o modal do video
	*/

    var self = this;

    self._container.hide();
    self._isVisible = false;
};

YoutubeAPIModal.prototype.setVideoId = function (newVideoId) {
    /*
	** Seta o id do video que será tocado
	*/

    var self = this;
    var src = self._srcInicio + newVideoId + self._srcFinal;

    self._iframe.attr('src', src);
};

YoutubeAPIModal.prototype.cleanVideoId = function () {
    /*
	** Limpa o id do vídeo que está sendo tocado
	*/

    var self = this;

    self._iframe.attr('src', '');
};