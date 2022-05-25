import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-mapa',
    templateUrl: './mapa.component.html',
    styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
    canvas: any;
    ctx: any;
    mouse:any = {x:0, y:0, puntero: null}
    styles = {
        default: {fillStyle: "#212F3C", strokeStyle: "#8E1B1B", lineWidth: 4},
        over: {fillStyle: "#6D587A", strokeStyle: "#F0F8", lineWidth: 10},
    };
    constructor() { }

    ngOnInit(): void {
        // Sacamos el canvas y el ctx por id del doc
        const canvas = <HTMLCanvasElement>document.getElementById('canvas');
        const ctx = canvas.getContext('2d'); 
        this.canvas = canvas;
        this.ctx = ctx;
    }

    aparecerFunct(tar:any){
        this.dibujarCanvas(this.canvas,this.ctx);
    }

    dibujarCanvas(canvas:any,context:any){
       

        const paths = [
            [100, 50, 350, 50, 500, 45, 500, 80, 350, 85, 100, 80],
            [200, 150, 350, 150, 500, 145, 500, 180, 350, 185, 100, 180],
            //La función Map itera sobre los arreglos y crea un array con los resultados
        ].map(this.createPath);

        canvas.addEventListener("mousemove", (e:any) => {
            //Ponemos un event listener para que se ponga a escuchar si se mueve el mouse
           this.mouse.x = e.offsetX;
           this.mouse.y = e.offsetY;
           this.checarMouse(paths);
           canvas.style.cursor = this.mouse.puntero ? "pointer" : "default"; 
        });
    }

    checarMouse(paths:any){
        var over;
        for(const p of paths) { 
            //esta función nos sirve para ver si el mouse se encuentra sobre alguna coordenada del path
            this.ctx.isPointInPath(p, this.mouse.x, this.mouse.y) && (over = p) 
        }
        if (over !== this.mouse.overPath) {
            this.mouse.overPath = over;
            this.ctx.clearRect(0, 0, 600, 200);
            for (const p of paths) {
                if (p === over) { 
                    this.dibujarPath(p, this.styles.over) 
                }
                else { 
                    this.dibujarPath(p) 
                }
            }
        }
    }

    dibujarPath(path:any, style = this.styles.default){
        Object.assign(this.ctx, style).fill(path);
        this.ctx.stroke(path); 
    }

    createPath(path:any){
        //Dibujamos en el canvas tomando en cuenta el map 
        var i = 0, p = new Path2D;
        while (i < path.length) { 
            p.lineTo(path[i++], path[i++]) 
        }
        p.closePath();
        return p;  
    }
}


