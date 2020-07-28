// import socket from './socket'


class Single {
    constructor(idCanvas) {
        this.c = document.getElementById(idCanvas)
        this.ctx = this.c.getContext("2d");
        this.paint = {time: {}, img: []}
        this.lastAction = ''
        this.bindEvents()
    }

    bindEvents() {  
        this.c.addEventListener('mousedown', ev => {
            this.setStartTime()

            this.x_pos = ev.offsetX
            this.y_pos = ev.offsetY
            this.lastAction = ev.type
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
        this.ctx.moveTo(this.x_pos, this.y_pos)
        this.ctx.lineTo(this.x_pos_over, this.y_pos_over)
        this.ctx.stroke()

        this.savePaint(this.x_pos, this.y_pos, this.x_pos_over, this.y_pos_over)
    }

    // Data Image

    setStartTime() {
        this.paint.time.start = new Date().getTime()
    }
    
    savePaint(x_From, y_From, x_moveTo, y_moveTo) {
        const time = new Date()
        const obj = {time: time.getTime() - this.paint.time.start, from: {x: x_From, y: y_From}, move: {x: x_moveTo, y: y_moveTo}}
        this.paint.img.push(obj)
        console.log(this.paint)
    }
}

const single = new Single('canvas_single')

const btn = document.getElementById('canvas_single_btn')
btn.addEventListener('click', ev => {
    console.log('BTN SINGLE')
    socket.emit('msgToServer', single.paint)
})