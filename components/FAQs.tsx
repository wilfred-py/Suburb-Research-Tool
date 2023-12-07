"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

export default function FAQs() {
    return (
        <div className="flex flex-col w-full h-96 mx-auto px-5 sm:px-9 md:px-10 lg:px-24 xl:px-44 2xl:px-64 mt-6">
            <h1 className="text-2xl">FAQs</h1>
            <div>
                <Accordion type="multiple">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is this free to use?</AccordionTrigger>
                        <AccordionContent>Yes - accessing all graphs is 100% free. All you need is an email.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Where does the data come from?</AccordionTrigger>
                        <AccordionContent>
                            All data are sourced from publicly available data on the Australian Bureau of Statistics (ABS) website.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>I spotted a bug. How do I report it?</AccordionTrigger>
                        <AccordionContent>
                            Thanks - your sharp eye is kindly appreciated. Please leave your feedback
                            <a href={"https://suburb-iq.canny.io/bug-reports"} target="_blank">
                                {" "}
                                <span className="font-bold underline">here</span>
                            </a>{" "}
                            and it will get fixed as soon as possible!
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How can I get in touch?</AccordionTrigger>
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
