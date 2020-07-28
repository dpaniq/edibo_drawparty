import socket from './socket'


class Single {
    constructor(idCanvas) {
        this.c = document.getElementById(idCanvas)
        this.ctx = this.c.getContext("2d");

        this.lastAction = ''

        this.bindEvents()

    }

    bindEvents() {  
  
        this.c.addEventListener('mousedown', ev => {
            this.x_pos = ev.offsetX
            this.y_pos = ev.offsetY
            this.lastAction = ev.type

            // var rect = ev.target.getBoundingClientRect();
            // console.log('RECT', rect)
            // console.log(100 * event.offsetX / rect.width * 5, 100 * event.offsetY / rect.height * 5)

        })

        this.c.addEventListener('mousemove', ev => {
            this.x_pos = ev.offsetX
            this.y_post = ev.offsetY
  

            this.x_pos_over = ev.offsetX
            this.y_pos_over = ev.offsetY

            if (this.lastAction === 'mousedown') this.draw()
                
            this.x_pos = this.x_post_over
            this.y_pos = this.y_post_over
        })

        this.c.addEventListener('mouseup', ev => {
            this.lastAction = ev.type
        })
    }

    draw() {
        this.ctx.moveTo(this.x_pos, this.y_pos);
        this.ctx.lineTo(this.x_pos_over, this.y_pos_over);
        this.ctx.stroke();
    }
}

const single = new Single('canvas_single')



// const world = document.getElementById('canvas_world')
// const ctx = world.getContext("2d")
// ctx.fillStyle = "green";
// ctx.fillRect(0, 0, 400, 500);

const btn = document.getElementById('canvas_single_btn')
btn.addEventListener('click', ev => {
    console.log('BTN SINGLE')
    socket.emit('chat message', 'MESSAGE FROM CLIENT');
})