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

    draw() {
        const last = this.getPreLast()

        this.ctx.moveTo(last.x_from, last.y_from)
        this.ctx.lineTo(last.x_moveTo, last.y_moveTo)
        this.ctx.stroke()
    }

    // Data Image

    // setStartTime() {
    //     this.paint.time.start = new Date().getTime()
    // }

    // setEndTime() {
    //     this.paint.time.end = new Date().getTime() - this.paint.time.start
    //     this.paint.time.start = 0 
    // }

    // World
    async repeat (payload) {


        for (let i = 1; i < payload.length - 1; i++) {
            this.ctx.moveTo(payload[i].x_from, payload[i].y_from)
            this.ctx.lineTo(payload[i].x_moveTo, payload[i].y_moveTo)
            this.ctx.stroke()

            await this.sleep(payload[i + 1].time - payload[i].time);
        }

        // console.log('\nP', payload, typeof payload)
        const startTime = new Date().getTime()
        const endtime = payload[payload.length - 1].time
        console.log(endtime)



        // let currentTime = 0


        // setInterval(() => {
        // const timer = setInterval(() => {
        //     const currentTime = new Date().getTime() - startTime
        //     console.log(currentTime)

        //     const current = payload.filter(line => {
        //         line.time === currentTime
        //         console.log(line.time, ' -!- ', currentTime, line.time === currentTime)
        //     })
        //     console.log(current)
        //     //     if (currentTime === line.time) {
        //     //         this.ctx.moveTo(line.x_from, line.y_from)
        //     //         this.ctx.lineTo(line.x_moveTo, line.y_moveTo)
        //     //         this.ctx.stroke()
        //     //     }
        //     // })

        //     if (new Date().getTime() - startTime > endtime) clearInterval(timer)
            
           
        // }, 1)

        

        

        
        
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
})


const socket = io();

// console.log('Allright')
// console.log(socket)

// socket.on('msgToClient', payload => {
//     console.log('PayLoad: ', payload)
// })

const solo = new Single('canvas_world')
socket.on('msgToClient', payload => {
    console.log('PayLoad: ', payload)
    solo.repeat(payload)
})