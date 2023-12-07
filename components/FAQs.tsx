"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

export default function FAQs() {
    return (
        <div className="flex flex-col w-full h-96 mx-auto px-5 sm:px-9 md:px-10 lg:px-12 xl:px-24 2xl:px-60 3xl:px-72 4xl:px-96 5xl:px-[440px] 6xl:px-[500px] 7xl:px-[600px] 8xl:px-[720px] mt-16 mb-20">
            <h1 className="text-2xl font-inter600">FAQs</h1>
            <div>
                <Accordion type="multiple">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold">Is this free to use?</AccordionTrigger>
                        <AccordionContent>Yes - accessing all graphs is 100% free. All you need is an email.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold">Where does the data come from?</AccordionTrigger>
                        <AccordionContent>
                            All data are sourced from publicly available data on the Australian Bureau of Statistics (ABS) website.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold">I spotted a bug. How do I report it?</AccordionTrigger>
                        <AccordionContent>
                            Thanks - your sharp eye is kindly appreciated. Please leave your feedback
                            <a href={"https://suburb-iq.canny.io/bug-reports"} target="_blank">
                                {" "}
                                <span className="font-bold underline">here</span>
                            </a>{" "}
                            and it will get fixed as soon as possible!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="font-semibold">How can I get in touch?</AccordionTrigger>
                        <AccordionContent>
                            Please feel free to drop a note to us at{" "}
                            <a
                                href="mailto:suburb.iq.feedback@gmail.com?subject=Feedback&body=Hi Suburb IQ team, "
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold"
                            >
                                suburb.iq.feedback@gmail.com
                            </a>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
