import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { GUI } from 'dat.gui';
import { ThemeService } from '../../core/services';

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
  private _cubes: THREE.Mesh[] = [];
  private _material!: THREE.MeshBasicMaterial;
  private _composer!: EffectComposer;
  private _clock!: THREE.Clock;
  private readonly _numberOfCubes = innerWidth / 50;
  private readonly _horizontalRange = [innerWidth / 10, -innerWidth / 10];
  private readonly _verticalRange = [innerWidth / 20, -innerWidth / 20];

  @HostListener('window:resize') onWindowResize(): void {
    this._renderer.setSize(innerWidth, innerHeight);
    this._camera.aspect = innerWidth / innerHeight;
    this._camera.updateProjectionMatrix();
  }

  @HostListener('window:scroll') onScroll(): void {
    this._renderer.domElement.style.top = window.scrollY + 'px';
  }

  constructor(private _themeService: ThemeService) {}

  ngOnInit(): void {
    this.init();
    this.initPostProcessing();
    this.animate();
    this.renderCubes();
    this.animate();
    // this.initGUI();

    this._themeService.canvasBackground$.subscribe((color) => {
      this._scene.background = new THREE.Color(color);
    });
  }

  private renderCubes(): void {
    for (let i = 0; i < this._numberOfCubes; i++) {
      this.createOctahedron();
    }
  }

  private createOctahedron(): void {
    let radius = this.getRandomNumb(20, 5);
    const geo = new THREE.OctahedronGeometry(radius);
    const mesh = new THREE.Mesh(geo, this._material);
    mesh.position.x = this.getRandomNumb(this._horizontalRange[0], this._horizontalRange[1]);
    mesh.position.y = this.getRandomNumb(this._verticalRange[0], this._verticalRange[1]);

    radius -= 3;

    const smallGeo = new THREE.OctahedronGeometry(radius);
    const smallMesh = new THREE.Mesh(smallGeo, this._material);

    mesh.add(smallMesh);
    this._cubes.push(mesh);
    this._scene.add(mesh);
  }

  private getRandomNumb(max: number, min: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private init(): void {
    this._renderer = new THREE.WebGLRenderer({ canvas: this.canvas.nativeElement});
    this._renderer.setSize(innerWidth, innerHeight);
    this._scene = new THREE.Scene();
    this._scene.background = new THREE.Color(0x1a1935);
    this._camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
    this._camera.position.z = 100;
    this._material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    this._clock = new THREE.Clock();
  }

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this._clock.getDelta();

    this._cubes.forEach(cube => {
      cube.rotation.x += 0.001;
      cube.rotation.y += 0.001;
    });

    this._composer.render(delta)
  }

  private initPostProcessing(): void {
    this._composer = new EffectComposer(this._renderer);
    this._composer.addPass(new RenderPass(this._scene,this._camera));

    const horizontalBlur = new ShaderPass(HorizontalBlurShader);
    horizontalBlur.uniforms['h'].value = 1 / innerWidth;
    this._composer.addPass(horizontalBlur);

    const verticalBlur = new ShaderPass(VerticalBlurShader);
    verticalBlur.uniforms['v'].value = 1 / innerHeight;
    verticalBlur.renderToScreen = true;
    this._composer.addPass(verticalBlur);
  }

  private initGUI(): void {
    const palette = {
      'bg-primary': [2, 1, 34],
      'bg-secondary': [63, 78, 111],
      'bg-body': '#1a1935',
      'text-primary': [255,255,255],
      'text-secondary': [0,0,0]
    }
    const gui = new GUI({ width: 500, });
    gui.domElement.style.fontSize = '1.2rem';
    gui.addColor(palette, 'bg-primary').onChange(val => this.setColorOnRoot('--bg-primary', val));
    gui.addColor(palette, 'bg-secondary').onChange(val => this.setColorOnRoot('--bg-secondary', val));
    gui.addColor(palette, 'bg-body').onChange(val => this._scene.background = new THREE.Color(val));
    gui.addColor(palette, 'text-primary').onChange(val => this.setColorOnRoot('--text-primary', val));
    gui.addColor(palette, 'text-secondary').onChange(val => this.setColorOnRoot('--text-secondary', val));
  }

  private setColorOnRoot(prop: string, val: any): void {
    document.documentElement.style.setProperty(prop, `rgb(${val})`);
  }
}
