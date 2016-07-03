/**
 * Created by fabre_h on 6/28/16.
 */

function MediaClient(params) {
    var client = {
        server_ip: params.ip,
        organization_public_id: params.organization_public_id,
        access_token: params.access_token,
        connected: false,
        handlers: params.handlers
    };

    client.connect = function () {
        console.log('Initializing socket');
        console.log('ws://' + client.server_ip + '/' + client.organization_public_id);
        client.socket = io.connect('ws://' + client.server_ip + '/' + client.organization_public_id);
        if (client.socket == null) {
            console.log('Could not initialize socket');
        }
    };

    client.authenticate = function () {
        client.send_message('authenticate', { access_token: client.access_token});
        client.socket.on('authenticated', function () {
            console.log('Successfully authenticated to media server');
            client.socket.on('message', client.handle_message);
            window.onbeforeunload = client.socket.disconnect;
        });
        client.socket.on('unauthorized', function (err) {
            console.log('Could not authenticate: ' + err.name)
        });
    };

    client.send_message = function (message_type, params) {
        var scope = 'action';
        client.socket.emit(scope, Object.assign({cmd: message_type}, params));
    };

    client.handle_scopes = function () {
        client.socket.on('namespace_scope', function(msg) {
            client.handlers.namespace.handle_message(msg);
        });
        client.socket.on('room_scope', function(msg) {
            client.handlers.room.handle_message(msg);
        });
        client.socket.on('user_scope', function(msg) {
            client.handlers.user.handle_message(msg);
        });
    };

    return client;
}

MediaClient.createClient = MediaClient;


