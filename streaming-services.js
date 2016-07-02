/**
 * Created by fabre_h on 6/28/16.
 */
    
class StreamingServices {

    constructor(ip, organization_public_id, access_token) {
        this.server_ip = ip;
        this.organization_public_id = organization_public_id;
        this.access_token = access_token;
        this.connected = false;
    }

    connect() {
        console.log('Initializing socket');
        this.socket = io.connect('ws://' + this.server_ip + '/' + this.organization_public_id);
        if (this.socket == null) {
            console.log('Could not initialize socket');
        }
    }

    authenticate() {
        this.send_message('authentication', { access_token: this.access_token});
        this.socket.on('authenticated', function () {
            console.log('Successfully authenticated to media server');
            this.run_message_handler();
            window.onbeforeunload = this.socket.disconnect();
        });
        this.socket.on('unauthorized', function (err) {
            console.log('Could not authenticate: ' + err.name)
        });
    }

    send_message(message_type, params) {
        this.socket.emit(message_type, params);
    }

    private run_message_handler() {
        this.socket.on('message', function(message) {
            if (this[message.type] !== undefined) {
                this[message.type](message.params);
            } else {
                console.log('Unknown message: ' + message.type);
            }
        })
    }
}
