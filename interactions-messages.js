/**
 * Created by fabre_h on 6/30/16.
 */

StreamingServices.draw_interaction = function (params) {
    var interaction = params['interaction'];
    params.canvas_context = canvas_context;
    if (StreamingServices[interaction] !== undefined) {
        var i = new StreamingServices[interaction](params);
        i.show();
    }
};

StreamingServices.remove_interaction = function (params) {
    var i = Interaction.find_by_id(params['interaction_id']);
    i.remove();
};