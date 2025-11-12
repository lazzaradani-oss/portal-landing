"use client";

import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, PerspectiveCamera, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { LeafNode } from "./LeafNode";

type Tree = {
	position: THREE.Vector3;
	height: number;
	trunkRadius: number;
	branches: { start: THREE.Vector3; end: THREE.Vector3 }[];
	leafColor: THREE.Color;
};

function Ground() {
	return (
		<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} frustumCulled={true}>
			<planeGeometry args={[200, 200, 1, 1]} />
			<meshStandardMaterial color="#02020a" roughness={1} metalness={0} />
		</mesh>
	);
}

function Trunks({ count = 24 }) {
	const positions = useMemo(() => {
		const arr: { pos: [number, number, number]; h: number }[] = [];
		for (let i = 0; i < count; i++) {
			const r = 6 + Math.random() * 18;
			const a = Math.random() * Math.PI * 2;
			const x = Math.cos(a) * r;
			const z = Math.sin(a) * r;
			const h = 4 + Math.random() * 10;
			arr.push({ pos: [x, h / 2, z], h });
		}
		return arr;
	}, [count]);
	return (
		<group>
			{positions.map((p, i) => (
				<mesh key={i} position={p.pos as any} frustumCulled={true}>
					<cylinderGeometry args={[0.08, 0.12, p.h, 8]} />
					<meshStandardMaterial color="#06060d" roughness={0.9} metalness={0.05} />
				</mesh>
			))}
		</group>
	);
}

function TreeSway({ tree, index }: { tree: Tree; index: number }) {
	const group = useRef<THREE.Group>(null);
	const phase = useMemo(() => Math.random() * Math.PI * 2, []);

	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		const swayX = Math.sin(t * 0.2 + phase) * 0.03; // subtle tree sway
		const swayZ = Math.cos(t * 0.18 + phase * 0.8) * 0.025;
		if (group.current) {
			group.current.rotation.x = swayZ;
			group.current.rotation.z = swayX;
		}
	});

	return (
		<group ref={group} position={tree.position} frustumCulled={false}>
			{/* Main trunk */}
			<mesh position={[0, tree.height / 2, 0]} frustumCulled={true}>
				<cylinderGeometry 
					args={[tree.trunkRadius * 0.6, tree.trunkRadius, tree.height, 12]}
					onUpdate={(g: THREE.BufferGeometry) => {
						const pos = (g as any).attributes?.position;
						if (pos && pos.count > 0) {
							try {
								g.computeBoundingBox();
								g.computeBoundingSphere();
							} catch {}
						}
					}}
				/>
				<meshStandardMaterial color="#0a0a15" roughness={0.95} metalness={0.02} />
			</mesh>

			{/* Branches with bioluminescent leaves */}
			{tree.branches.map((branch, i) => {
				const branchDir = branch.end.clone().sub(branch.start);
				const branchLength = branchDir.length();
				const branchMid = branch.start.clone().add(branchDir.multiplyScalar(0.5));
				
				// Calculate branch rotation
				const axis = new THREE.Vector3(0, 1, 0);
				const quaternion = new THREE.Quaternion().setFromUnitVectors(
					axis,
					branchDir.clone().normalize()
				);
				const euler = new THREE.Euler().setFromQuaternion(quaternion);

				return (
					<group key={`branch-${i}`}>
						{/* Branch cylinder */}
						<mesh position={branchMid} rotation={euler} frustumCulled={true}>
							<cylinderGeometry 
								args={[0.03, 0.05, branchLength, 6]}
								onUpdate={(g: THREE.BufferGeometry) => {
									const pos = (g as any).attributes?.position;
									if (pos && pos.count > 0) {
										try {
											g.computeBoundingBox();
											g.computeBoundingSphere();
										} catch {}
									}
								}}
							/>
							<meshStandardMaterial color="#0d0d1a" roughness={0.9} metalness={0.03} />
						</mesh>

						{/* Leaves at branch end */}
						{[0, 1, 2, 3].map((leafIdx) => {
							const spread = 0.4;
							const angle = (leafIdx / 4) * Math.PI * 2 + Math.random() * 0.5;
							const dist = 0.15 + Math.random() * 0.25;
							const leafPos: [number, number, number] = [
								branch.end.x + Math.cos(angle) * dist,
								branch.end.y + (Math.random() - 0.5) * spread,
								branch.end.z + Math.sin(angle) * dist,
							];
							return (
								<LeafNode
									key={`leaf-${i}-${leafIdx}`}
									position={leafPos}
									color={tree.leafColor.getStyle()}
									scale={0.12 + Math.random() * 0.06}
									pulseSpeed={0.6 + Math.random() * 0.5}
									sway={false}
								/>
							);
						})}
					</group>
				);
			})}
		</group>
	);
}

function Trees({ count = 18 }) {
	const palette = ["#00ffff", "#ff00ff", "#39ff14", "#4dd0e1", "#8b00ff", "#ff69b4"].map((c) => new THREE.Color(c));
	
	const trees = useMemo<Tree[]>(() => {
		const result: Tree[] = [];
		for (let i = 0; i < count; i++) {
			const r = 5 + Math.random() * 16;
			const a = Math.random() * Math.PI * 2;
			const position = new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r);
			const height = 6 + Math.random() * 8;
			const trunkRadius = 0.15 + Math.random() * 0.1;
			const leafColor = palette[i % palette.length];

			// Generate 4-7 branches at different heights
			const branchCount = 4 + Math.floor(Math.random() * 4);
			const branches: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
			
			for (let b = 0; b < branchCount; b++) {
				const heightRatio = 0.4 + (b / branchCount) * 0.55; // branches in upper 60% of tree
				const startY = height * heightRatio;
				const branchAngle = (b / branchCount) * Math.PI * 2 + Math.random() * 1;
				const branchLength = 1.2 + Math.random() * 2;
				const horizontalDist = branchLength * (0.6 + Math.random() * 0.3);
				const verticalRise = branchLength * (0.3 + Math.random() * 0.4);

				const start = position.clone().add(new THREE.Vector3(0, startY, 0));
				const end = start.clone().add(
					new THREE.Vector3(
						Math.cos(branchAngle) * horizontalDist,
						verticalRise,
						Math.sin(branchAngle) * horizontalDist
					)
				);
				branches.push({ start, end });
			}

			result.push({ position, height, trunkRadius, branches, leafColor });
		}
		return result;
	}, [count]);

	return (
		<group>
			{trees.map((tree, i) => (
				<TreeSway key={i} tree={tree} index={i} />
			))}
		</group>
	);
}

function MistLayers() {
	const group = useRef<THREE.Group>(null);
	useFrame((state) => {
		if (group.current) {
							group.current.children.forEach((child, i) => {
						child.position.x = Math.sin(state.clock.elapsedTime * 0.02 + i) * 2;
						child.position.z = Math.cos(state.clock.elapsedTime * 0.015 + i * 0.5) * 2;
								const mesh = child as THREE.Mesh;
								const m = (mesh && !Array.isArray(mesh.material) ? (mesh.material as THREE.MeshBasicMaterial) : null);
								if (m) m.opacity = 0.12 + 0.08 * Math.sin(state.clock.elapsedTime * 0.4 + i);
					});
		}
	});

	const mats = useMemo(() =>
		["#4dd0e1", "#00ffff", "#ff69b4"].map((c) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.15, depthWrite: false })),
	[]);

	return (
		<group ref={group} position={[0, 0.6, 0]}>
			{[0, 1, 2].map((i) => (
						<mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
										<circleGeometry
											args={[18 - i * 3, 64]}
											onUpdate={(g: THREE.BufferGeometry) => {
												const pos = (g as any).attributes?.position;
												if (pos && pos.count > 0) {
													try {
														g.computeBoundingBox();
														g.computeBoundingSphere();
													} catch {}
												}
											}}
										/>
					<primitive object={mats[i]} attach="material" />
				</mesh>
			))}
		</group>
	);
}

function Scene() {
	return (
		<>
			{/* Scene background and fog for depth */}
			<color attach="background" args={["#000000"]} />
			<fog attach="fog" args={["#0a0f2c", 4, 20]} />

		{/* Night lighting */}
		<ambientLight intensity={0.2} />
		<directionalLight position={[5, 10, 2]} intensity={0.5} color={new THREE.Color("#a56eff")} />

		{/* Ground and forest trees with bioluminescent leaves */}
		<Ground />
		<Trees />

		{/* Misty atmosphere */}
		<MistLayers />			{/* Fireflies / ambient sparkles */}
			<Sparkles count={120} scale={[40, 8, 40]} size={3} speed={0.3} opacity={0.7} color="#aaffff" />

					{/* Postprocessing for bioluminescent glow */}
								<EffectComposer multisampling={0}>
								{/* Subtle, selective glow tuned for dark fog palette */}
								<Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.6} luminanceSmoothing={0.2} radius={0.6} />
								<Vignette eskil={false} offset={0.22} darkness={0.82} />
							</EffectComposer>
		</>
	);
}

		function IntroDolly({ duration = 2.6 }: { duration?: number }) {
			const { camera, scene } = useThree();
			const start = useRef<number | null>(null);
			const from = useRef(new THREE.Vector3(0, 3, 11));
			const to = useRef(new THREE.Vector3(0, 2, 8));

				useEffect(() => {
				// Set initial camera and fog values at mount
				camera.position.copy(from.current);
				camera.lookAt(0, 1.8, 0);
			}, [camera, scene]);

			useFrame((state) => {
				if (start.current === null) start.current = state.clock.getElapsedTime();
				const t = Math.min(1, (state.clock.getElapsedTime() - start.current) / duration);
				const eased = t * (2 - t); // easeOutQuad
				camera.position.lerpVectors(from.current, to.current, eased);
				camera.lookAt(0, 1.8, 0);
			});

			return null;
		}

export default function ForestNetwork() {
	return (
		<div className="relative w-[100vw] h-[100vh] bg-black">
					<Canvas
				dpr={[1, 1.5]}
				gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
				shadows={false}
				camera={{ fov: 50, position: [0, 2, 8], near: 0.1, far: 1000 }}
			>
						<Suspense fallback={null}>
					<PerspectiveCamera makeDefault fov={50} position={[0, 2, 8]} />
					<AdaptiveDpr pixelated />
					<AdaptiveEvents />
									<IntroDolly />
					<Scene />
				</Suspense>
			</Canvas>
		</div>
	);
}

