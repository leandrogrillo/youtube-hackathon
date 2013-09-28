function YoutubeAPIModal(container) {
    this._body = $('body');
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
    // self._container.show();
    self._body.addClass('body-overflow modal-on');
    self._isVisible = true;
};

YoutubeAPIModal.prototype.hide = function () {
    /*
	** Esconde o modal do video
	*/

    var self = this;

    // self._container.hide();
    self._body.removeClass('body-overflow modal-on');
    self.cleanVideoId();
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