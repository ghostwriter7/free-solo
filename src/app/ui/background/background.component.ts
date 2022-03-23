import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {
  @ViewChild('background', { static: true }) canvas!: ElementRef;
  private _renderer!: THREE.WebGLRenderer;
  private _scene!: THREE.Scene;
  private _camera!: THREE.PerspectiveCamera;
  private _cube!: THREE.Mesh;
  private _cubes!: THREE.Mesh[];
  private _material!: THREE.MeshBasicMaterial;
  constructor() { }

  @HostListener('window:resize') onWindowResize(): void {
    this._renderer.setSize(innerWidth, innerHeight);
    this._camera.aspect = innerWidth / innerHeight;
    this._camera.updateProjectionMatrix();
  }

  @HostListener('window:scroll') onScroll(): void {
    this._renderer.domElement.style.top = window.scrollY + 'px';
  }

  ngOnInit(): void {
    this.init();
    this.animate();
     const geo = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    this._cube = new THREE.Mesh(geo, material);
    const smallGeo = new THREE.BoxGeometry(9, 9, 9);
    const smallCube = new THREE.Mesh(smallGeo, material);
    this._cube.add(smallCube);

    this._scene.add(this._cube);

    // const animate = () => {
    //   requestAnimationFrame( animate );
    //
    //   this._cube.rotation.x += 0.01;
    //   this._cube.rotation.y += 0.01;
    //
    //   this._renderer.render( this._scene, this._camera );
    // };

    this.animate();
  }

  private createCubes(): void {
    const geo = new THREE.BoxGeometry(this.getRandomNumb(), this.getRandomNumb(), this.getRandomNumb());

  }

  private getRandomNumb(max = 20, min = 10): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private init(): void {
    this._renderer = new THREE.WebGLRenderer({ canvas: this.canvas.nativeElement});
    this._renderer.setSize(innerWidth, innerHeight);
    this._scene = new THREE.Scene();
    this._scene.background = new THREE.Color(0x1a1935);
    this._camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
    this._camera.position.z = 45;
    this._camera.position.x = 45;
    this._material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  }

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));

    this._renderer.render(this._scene, this._camera);
  }





}
