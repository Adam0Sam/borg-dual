import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";



export default function CustomPage() {
    let params = useParams();
    const postSlug = params.slug;

    return <h1>{postSlug}</h1>;
}