/**
 * Created by fabre_h on 6/30/16.
 */

StreamingServices.prototype.drawInteraction = function (params) {
    var interaction = params['interaction'];
    params.canvasContext = canvasContext;
    if (Interaction.is_valid(interaction)) {
        var i = new StreamingServices[interaction](params);
        i.show();
    }
};

StreamingServices.prototype.removeInteraction = function (params) {
    var i = Interaction.find_by_id(params['interaction_id']);
    i.remove();
};