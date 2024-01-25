
import { Environment, Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { angleToRadians } from "../../utils/angle";
import * as THREE from 'three';
import gsap from 'gsap';
import Car from './Car'
export default function Three (){
    const orbitControlRef = useRef(null);
    const ballRef = useRef(null);
    const carRef = useRef(null);
    useFrame((state)=>{
        const{x,y} = state.mouse;
        
        orbitControlRef.current.setAzimuthalAngle(-x * angleToRadians(45))
        orbitControlRef.current.setPolarAngle((y+1) * angleToRadians(90 - 30))
        orbitControlRef.current.update();
       
    })

    useEffect(()=>{
        if(!!orbitControlRef.current){
            console.log(orbitControlRef.current)
        }
    },[orbitControlRef.current])
    //for pure js use requestAnimationFrame
    requestAnimationFrame(() =>{

    })
    useEffect(()=>{
        if(!!ballRef.current){
            console.log(ballRef.current)

            //animation 

            const timeline = gsap.timeline({paused:true})
            timeline.to(ballRef.current.position,{x : 2,duration: 3.5 ,ease:'power2.out'})
            timeline.to(ballRef.current.position,{
                y: 1, duration: 1 , ease:'bounce.out'
            },"<")
            // gsap.to(ballRef.current.position ,{x:2 , duration:3 , ease: "power2.out"} )
            // gsap.to(ballRef.current.position , {y:1 , duration: 0.75, ease: "bounce.out" })
            timeline.play();
        }
    },[ballRef.current,])

    useEffect(()=>{
        if(!!carRef.current){
            console.log(carRef.current)
            
        }

    },[carRef.current])
    return(
        <>
        <PerspectiveCamera makeDefault position={[0,1,7]}/>
        <OrbitControls ref={orbitControlRef} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(80)}/>
        <mesh rotation={[-angleToRadians(90),0,0]} receiveShadow >
            <meshStandardMaterial color={'powderblue'}  />
            <planeGeometry args={[7,7]} />
        </mesh>
        <mesh position={[-3,4,0]} castShadow ref={ballRef} >
            <meshStandardMaterial color={'hotpink'} metalness={0.5} roughness={1}/>
             <sphereGeometry args={[1,35,35]}  />
        </mesh>
            <Car ref={carRef}/>
            <ambientLight args={["#ffffff" , 0.4]}/>
            {/* Directional Lights */}
            {/* <directionalLight args={['red' , 1]} position={[-4,1,0]} /> */}

            {/* <pointLight args={['red' , 1]} position={[-4,1,0]} /> */}
            <spotLight args={['white',2,10,angleToRadians(30),0.1]} position={[-4,1,0]} castShadow />
            <Environment background>
            <mesh>
               <sphereGeometry args={[50,100 , 100]} />
               <meshBasicMaterial color={'white'} side={THREE.BackSide} /> 
               </mesh>
            </Environment>
        </>  
    )

}