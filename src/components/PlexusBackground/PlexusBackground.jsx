import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PlexusBackground = ({ theme }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 100);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle setup
    const pointCount = 110;
    const rRange = 12;
    const positions = new Float32Array(pointCount * 3);
    const velocities = [];

    for (let i = 0; i < pointCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * rRange * 1.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * rRange * 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * rRange * 1.5;

      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const colorPoint = theme === 'dark' ? 0xffd700 : 0x7040c4;
    const pointMaterial = new THREE.PointsMaterial({
      color: colorPoint,
      size: 0.25,
      transparent: true,
      opacity: 0.8
    });
    const points = new THREE.Points(pointGeometry, pointMaterial);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: theme === 'dark' ? 0x9d4edd : 0x7040c4,
      transparent: true,
      opacity: 0.18,
      linewidth: 1
    });

    const plexusGroup = new THREE.Group();
    plexusGroup.add(points);
    scene.add(plexusGroup);

    let linesMesh = null;
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    const handleMouseMove = (e) => {
      if (e.clientY < window.innerHeight) {
        targetX = (e.clientX - window.innerWidth / 2) * 0.001;
        targetY = (e.clientY - window.innerHeight / 2) * 0.001;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Move points
      const positionsArr = pointGeometry.attributes.position.array;
      for (let i = 0; i < pointCount; i++) {
        positionsArr[i * 3] += velocities[i].x;
        positionsArr[i * 3 + 1] += velocities[i].y;
        positionsArr[i * 3 + 2] += velocities[i].z;

        if (Math.abs(positionsArr[i * 3]) > rRange) velocities[i].x *= -1;
        if (Math.abs(positionsArr[i * 3 + 1]) > rRange) velocities[i].y *= -1;
        if (Math.abs(positionsArr[i * 3 + 2]) > rRange) velocities[i].z *= -1;
      }
      pointGeometry.attributes.position.needsUpdate = true;

      // Draw lines
      if (linesMesh) plexusGroup.remove(linesMesh);

      const linePositions = [];
      const connectionThreshold = 4.8;

      for (let i = 0; i < pointCount; i++) {
        const x1 = positionsArr[i * 3];
        const y1 = positionsArr[i * 3 + 1];
        const z1 = positionsArr[i * 3 + 2];

        for (let j = i + 1; j < pointCount; j++) {
          const x2 = positionsArr[j * 3];
          const y2 = positionsArr[j * 3 + 1];
          const z2 = positionsArr[j * 3 + 2];

          const dist = Math.sqrt(
            (x2 - x1) * (x2 - x1) +
            (y2 - y1) * (y2 - y1) +
            (z2 - z1) * (z2 - z1)
          );

          if (dist < connectionThreshold) {
            linePositions.push(x1, y1, z1, x2, y2, z2);
          }
        }
      }

      if (linePositions.length > 0) {
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        plexusGroup.add(linesMesh);
      }

      // Rotate and tilt
      plexusGroup.rotation.y += 0.0015;
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      plexusGroup.rotation.x = mouseY;
      plexusGroup.rotation.y = mouseX + (plexusGroup.rotation.y % (Math.PI * 2));

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme]);

  return <div ref={containerRef} className="hero-canvas-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none', opacity: 0.75 }} />;
};

export default PlexusBackground;
