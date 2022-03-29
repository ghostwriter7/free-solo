import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { ThemeService } from '../../core/services';
import {
  Clock,
  Color,
  Mesh,
  MeshBasicMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {
  @ViewChild('background', { static: true }) canvas!: ElementRef;
  private _renderer!: WebGLRenderer;
  private _scene!: Scene;
  private _camera!: PerspectiveCamera;
  private _cubes: Mesh[] = [];
  private _material!: MeshBasicMaterial;
  private _composer!: EffectComposer;
  private _clock!: Clock;
  private readonly _numberOfCubes = innerWidth / 50;
  private readonly _horizontalRange = [innerWidth / 10, -innerWidth / 10];
  private readonly _verticalRange = [innerWidth / 20, -innerWidth / 20];

  @HostListener('window:resize') onWindowResize(): void {
    this._camera.aspect = innerWidth / innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(innerWidth, innerHeight, true);
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

    this._themeService.canvasBackground$.subscribe((color) => {
      this._scene.background = new Color(color);
    });
  }

  private renderCubes(): void {
    for (let i = 0; i < this._numberOfCubes; i++) {
      this.createOctahedron();
    }
  }

  private createOctahedron(): void {
    let radius = this.getRandomNumb(20, 5);
    const geo = new OctahedronGeometry(radius);
    const mesh = new Mesh(geo, this._material);
    mesh.position.x = this.getRandomNumb(this._horizontalRange[0], this._horizontalRange[1]);
    mesh.position.y = this.getRandomNumb(this._verticalRange[0], this._verticalRange[1]);
    mesh.position.z = this.getRandomNumb(this._horizontalRange[0], this._horizontalRange[1]);

    radius -= 3;

    const smallGeo = new OctahedronGeometry(radius);
    const smallMesh = new Mesh(smallGeo, this._material);

    mesh.add(smallMesh);
    this._cubes.push(mesh);
    this._scene.add(mesh);
  }

  private getRandomNumb(max: number, min: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  private init(): void {
    this._renderer = new WebGLRenderer({ canvas: this.canvas.nativeElement});
    this._renderer.setSize(innerWidth, innerHeight);
    this._scene = new Scene();
    this._scene.background = new Color(0x1a1935);
    this._camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
    this._camera.position.z = 0;
    this._material = new MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    this._clock = new Clock();
  }

  private animate(): void {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this._clock.getDelta();

    this._cubes.forEach(cube => {
      cube.rotation.x += 0.001;
      cube.rotation.y += 0.001;
    });

    this._camera.rotation.y += 0.0005;

    this._composer.render(delta)
  }

  private initPostProcessing(): void {
    this._composer = new EffectComposer(this._renderer);
    this._composer.addPass(new RenderPass(this._scene,this._camera));

    const horizontalBlur = new ShaderPass(HorizontalBlurShader);
    horizontalBlur.uniforms['h'].value = .5 / innerWidth;
    this._composer.addPass(horizontalBlur);

    const verticalBlur = new ShaderPass(VerticalBlurShader);
    verticalBlur.uniforms['v'].value = .5 / innerHeight;
    verticalBlur.renderToScreen = true;
    this._composer.addPass(verticalBlur);
  }
}
