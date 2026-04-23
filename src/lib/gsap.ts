import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);
  CustomEase.create("signature", "0.65, 0, 0.35, 1");
  gsap.defaults({ ease: "signature", duration: 0.8 });
}

export { gsap, ScrollTrigger, SplitText, CustomEase };
