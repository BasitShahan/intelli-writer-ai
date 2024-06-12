"use client";
import Button from '@/components/Button';
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillFileText } from 'react-icons/ai';
import { FaChevronRight } from 'react-icons/fa6'
import { LuCopy } from 'react-icons/lu';
import { BypassLoading, contentAtScale, copyLeaks, crossPlag, gptZero, sapling, writer, zeroGpt } from '../../../../public/index';
import { TiTick } from 'react-icons/ti';
import { ImCross } from 'react-icons/im';
import dynamic from 'next/dynamic';

const QuillEditor = dynamic(() => import('@/components/QuillEditor'), {
  ssr: false, 
});

const Bypass = () => {
    const [textData, setTextData] = useState<string>('');
    const [wordCount, setWordCount] = useState<number>(0);
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const editorRef = useRef<any>(null);

    const editorConfig = {
        modules: {
            toolbar: [
                [{ 'header': '1' }],
                [{ size: [] }],
                ['bold', 'italic', 'underline',],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image', 'video'],
                ['clean']
            ],
        },
        formats: [
            'header', 'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'link', 'image', 'video'
        ]
    };
    useEffect(() => {
        setWordCount(textData.trim().split(/\s+/).filter(word => word.length > 0).length);
    }, [textData]);

    const handlePasteFromClipboard = async () => {
        try {
            const clipboardText = await navigator.clipboard.readText();
            setTextData(clipboardText);
        } catch (error) {
            console.error('Failed to read clipboard contents: ', error);
        }
    };

    const handlePasteSampleText = () => {
        setTextData('Machine learning (ML) is a dynamic field at the intersection of computer science and statistics, aiming to empower computers with the ability to learn from data and make predictions or decisions without being explicitly programmed. At its core, ML algorithms utilize patterns and structures within data to generate insights, classify information, or forecast outcomes. With an ever-expanding array of techniques including supervised learning, unsupervised learning, and reinforcement learning, ML has found application in diverse domains such as finance, healthcare, marketing, and autonomous vehicles.');
    };

    const handleSubmit = async (e: React.FormEvent, prompt: string) => {
        e.preventDefault();
        setResponse(null);
        setError(null);
        try {
            setLoading(true);
            console.log("Loading");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/freeapi/bypass-ai`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            else {
                const result = await res.json();
                setResponse(result);
                console.log(response);
            }
        } catch (error) {
            setError('An error occurred while processing your request.');
        } finally {
            setLoading(false);
        }
    };

    const sliceResponse = (text: string) => {
        return text.slice(4, text.length-4);
    };
    return (
        <div className="absolute top-14 right-0 md:px-20 md:py-5 p-6 w-full lg:w-[calc(100%-250px)] text-white">
            <div className="flex justify-center w-full flex-col h-full text-white md:py-10 py-5 -mt-6">
                <div className="text-base text-slate-400 font-light p-2 flex items-center gap-2">
                    <Link href="/user/dashboard">Dashboard</Link>
                    <FaChevronRight className="text-sm" />
                    <Link href="/user/ai-bypass">Bypass AI</Link>
                </div>
                <h2 className="text-3xl font-semibold p-2 pb-3">
                    Bypass AI
                </h2>

                <div className="flex my-2 w-full md:flex-row flex-col gap-5">
                    {/* Search text */}

                    <form onSubmit={(e) => handleSubmit(e, textData)} className="h-[500px] md:w-1/2 w-full justify-center flex border border-btnPrimary backdrop-blur-md rounded-lg drop-shadow-lg">
                        <div className="flex flex-col w-full relative p-0">
                            {textData === '' ? (
                                <div className='h-full w-full flex flex-col md:flex-row items-center justify-center gap-10'>
                                    <button onClick={handlePasteFromClipboard}>
                                        <LuCopy size={50} />
                                        Paste Text
                                    </button>
                                    <button
                                        onClick={handlePasteSampleText}
                                    >
                                        <AiFillFileText size={50} />
                                        Try A Sample
                                    </button>
                                </div>) : (
                                <>
                                    <textarea
                                        className="w-full h-full text-white p-2 rounded-md bg-transparent"
                                        value={textData}
                                        onChange={(e) => setTextData(e.target.value)}
                                    />
                                    <div className={`${wordCount > 300 ? 'text-red-500' : ' text-white/60'} bg-[#0F062C] rounded-xl px-2 absolute left-3 bottom-2`}>
                                        {wordCount}/300 words
                                    </div>
                                    {wordCount > 300 ? (
                                        <Link
                                            href="/user/plans">
                                            <Button title='Upgrade' btnType='button' className='absolute bottom-2 right-3 !w-fit' />
                                        </Link>
                                    ) : (
                                        <Button title='Humanize' btnType='submit' className='absolute bottom-2 right-3 !w-fit' />
                                    )}
                                </>
                            )}
                        </div>
                    </form>
                    <div className="h-[500px] md:w-1/2 w-full justify-center flex border border-btnPrimary backdrop-blur-md rounded-lg drop-shadow-lg">
                        { 
                        loading ? (
                            <div className='flex h-full items-center justify-center'>
                                <img src={BypassLoading} alt="Loading..." />
                                <span className='text-center text-lg text-white'>Humanizing...</span>
                            </div>
                        ) : response ? (
                            <QuillEditor editorConfig={editorConfig}
                                ref={editorRef}
                                tabs=""
                                query=""
                                response={sliceResponse(response)}
                                outlineResponse=""
                                quiz=""
                                assignment="" />
                        ) : (
                            <div className='flex h-full items-center justify-center'>
                                No Response Yet
                            </div>
                        )}
                    </div>
                </div>
                {response ? (
                    <div className='my-5 rounded-md bg-gradient-to-br from-[#161738] to-[#161738ad] text-white shadow-2xl border border-[#373737] p-5 flex flex-col gap-3'>
                        <div className='flex md:text-lg items-center'>
                            <TiTick size={40} color='green' /> The output content seems to be human-written.
                        </div>
                        <div className='border border-[#373737] rounded-md p-4 flex flex-col gap-3'>
                            Checking result:
                            <div className='flex flex-col md:flex-row flex-wrap gap-5 text-sm items-center justify-start md:justify-between'>
                                <span className='flex gap-2 md:items-center'><img src={gptZero} className='w-7 h-7' /> GPTzero <TiTick size={20} color='green' /></span>
                                <span className='flex gap-2 md:items-center'><img src={copyLeaks} className='w-7 h-7' /> Copyleaks <TiTick size={20} color='green' /></span>
                                <span className='flex gap-2 md:items-center'><img src={zeroGpt} className='w-7 h-7 bg-white rounded-full' /> ZeroGPT <TiTick size={20} color='green' /></span>
                                <span className='flex gap-2 md:items-center'><img src={crossPlag} className='w-7 h-7' /> Crossplag <TiTick size={20} color='green' /></span>
                                <span className='flex gap-2 md:items-center'><img src={sapling} className='w-7 h-7' /> Sapling <TiTick size={20} color='green' /></span>
                                <span className='flex gap-2 md:items-center'><img src={writer} className='w-7 h-7 bg-white rounded-full' /> Writer <TiTick size={20} color='green' /></span>
                                <span className='flex gap-2 md:items-center'><img src={contentAtScale} className='w-7 h-7' /> Content at Scale<TiTick size={20} color='green' /></span>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            <span className='flex gap-1 md:items-center'><TiTick size={30} color='green' />Human-written</span>
                            <span className='flex gap-1 md:items-center'><TiTick size={30} color='gray' />50% Human-written</span>
                            <span className='flex gap-2 md:items-center'><ImCross size={20} color='red' />AI-generated</span>
                        </div>
                    </div>) : (<></>)}
            </div>
        </div>
    )
}

export default Bypass
