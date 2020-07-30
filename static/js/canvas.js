class Single {
    constructor(idCanvas) {
        this.c = document.getElementById(idCanvas)
        this.ctx = this.c.getContext("2d");

        this.startDrawTime = 0
        this.image = []
        this.lastAction = ''

        this.bindEvents()
    }

    getPreLast() {
        return this.image[this.image.length - 2]
    }

    bindEvents() {  
        this.c.addEventListener('mousedown', ev => {
            this.lastAction = ev.type
            this.startDrawTime = this.startDrawTime < 1 ? new Date().getTime() : this.startDrawTime
            this.image.push({x_from: ev.offsetX, y_from: ev.offsetY})
        })

        this.c.addEventListener('mousemove', ev => {
            if (this.lastAction === 'mousedown') {
                const last = this.image.pop()
                last.time = new Date().getTime() - this.startDrawTime
                last.x_moveTo = ev.offsetX
                last.y_moveTo = ev.offsetY

                this.image.push(last)
                this.image.push({x_from:  last.x_moveTo, y_from: last.y_moveTo})
                
                this.draw()
                console.log(this.image)
            }
        })
        
        this.c.addEventListener('mouseup', ev => {
            this.lastAction = ev.type
        })
    }

    destroy() {
        this.startDrawTime = 0
        this.image = []

        const w = this.c.width
        this.c.width = 0
        this.c.width = w

        this.ctx.clearRect(0,0, 500, 500)
        // context.clearRect(0, 0, 500, 500)
        // console.log(this.image)
    }

    draw() {
        const last = this.getPreLast()

        this.ctx.moveTo(last.x_from, last.y_from)
        this.ctx.lineTo(last.x_moveTo, last.y_moveTo)
        this.ctx.stroke()
    }

    // World
    async repeat (payload) {
        for (let i = 1; i < payload.length - 1; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(payload[i].x_from, payload[i].y_from)
            this.ctx.lineTo(payload[i].x_moveTo, payload[i].y_moveTo)
            this.ctx.stroke()

            await this.sleep(payload[i + 1].time - payload[i].time);
        }
    }

    // ### TOOLS ###
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const single = new Single('canvas_single')

const btn = document.getElementById('canvas_single_btn')
btn.addEventListener('click', ev => {
    single.image.pop()
    socket.emit('msgToServer', single.image)
    single.destroy()
})


const socket = io();

const solo = new Single('canvas_world')
socket.on('msgToClient', payload => {
    solo.repeat(payload)
})