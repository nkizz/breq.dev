import React, { useRef } from "react"
import Gltf from "../models/Gltf"
import useScroll from "../models/useScroll"

function InnerLogo() {
    const model = useRef()

    useScroll((scroll, height) => {
        if (model.current) {
            if (scroll < height / 2) {
                model.current.position.set(-scroll / 200, 0, 0)
            } else {
                model.current.position.set(-height / 400, 0, 0)
            }


            model.current.rotation.y = 2e-3 * scroll
        }
    }, model)

    return (
        <Gltf url="/models/inner_logo.glb" ref={model} scale={[0.5, 0.5, 0.5]} />
    )
}


function DimmingLight({color, angle}) {
    const position = [10 * Math.cos(angle), 10 * Math.sin(angle), 10]
    const light = useRef()

    useScroll((scroll) => {
        if (light.current) {
            light.current.intensity = Math.max(1 - (scroll / window.innerHeight), 0)
        }
    })

    return (
        <spotLight color={color} position={position} ref={light} />
    )
}


function ThreeLights() {
    return (
        <>
            <DimmingLight color={0xFF1B8D} angle={Math.PI * 3/6} />
            <DimmingLight color={0xFFDA00} angle={Math.PI * 7/6} />
            <DimmingLight color={0x1BB3FF} angle={Math.PI * 11/6} />
        </>
    )
}


export default function Greeting() {
    return (
        <>
            <InnerLogo />
            <ThreeLights />
        </>
    )
}