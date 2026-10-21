import { Image, Input, Tabs, Upload } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import { LucideUpload, XCircle } from 'lucide-react'
import { button } from 'motion/react-client'
import React, { useState } from 'react'
import { createCourse, updateCourse } from '../../Api'

function CourseModal({ onUpdate, onClose, targetCourse }) {
    const [formData, setFormData] = useState({
        courseName: targetCourse ? targetCourse.courseName : '',
        CourseDescription: targetCourse ? targetCourse.courseDescription : '',
        CoursePrice: targetCourse ? targetCourse.coursePrice : '',
        CourseLink: targetCourse ? targetCourse.courseUrl : ''
    })

    const [fileList, setFileList] = useState([]);
    const [prevImage, setPreviewImage] = useState(targetCourse ? targetCourse.courseImage : null)
    const [activeKey, setActiveKey] = useState('1');

    function handleFile(info) {
        console.log(info)
        const file = info.fileList[0].originFileObj;

        setFileList(info.fileList);
        setPreviewImage(URL.createObjectURL(file))

    }

    function clearPreview() {
        if (prevImage && prevImage.startsWith('blob:')) {
            URL.revokeObjectURL(prevImage);
        }
        setPreviewImage(null);
        setFileList([])
    }


    function handleValue(event) {
        const { name, value } = event.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }



    const cancel = () => onClose();

    async function handleSubmit(event) {
        event.preventDefault();
        const payload = {
            courseName: formData.courseName,
            courseDescription: formData.CourseDescription,
            coursePrice: formData.CoursePrice,
            courseUrl: formData.CourseLink
        }

        const formBody = new FormData();
        formBody.append('request', new Blob([JSON.stringify(payload)], {
            type: 'application/json'
        }))

        const file = fileList[0].originFileObj;
        formBody.append('image', file)

        if (targetCourse) {
            const courseId = targetCourse.courseId
            const result = await updateCourse({ data: formBody, courseId })
            if (result) {
                cancel();
                onUpdate()
            }

        } else {
            const result = await createCourse(formBody);
            console.log(result);
            if (result) {
                cancel();
                onUpdate()
            }
        }


    }

    return (
        <div className="fixed inset-0 bg-black/30 bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[600px] max-h-[90vh] overflow-y-auto">
                <h2> {targetCourse ? 'Edit Course' : 'Add course'}</h2>
                <Tabs activeKey={activeKey} onChange={(key) => setActiveKey(key)} type='line'>
                    <TabPane tab="Course Image" key="1">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="text-xs text-gray-500 mb-1">Upload Photo</label>
                                <div className="border border-gray-200 rounded-md bg-gray-50 px-4 py-2">
                                    <Upload
                                        beforeUpload={() => false}
                                        onChange={handleFile}
                                        fileList={fileList}
                                        accept="image/*"
                                        showUploadList={false}
                                        maxCount={1}
                                    >
                                        <button
                                            type="button"
                                            className="h-8 flex items-center gap-2 text-sm text-gray-700"
                                        >
                                            <LucideUpload size={16} />
                                            <span>Select Photo</span>
                                        </button>
                                    </Upload>
                                </div>
                                {prevImage && (
                                    <div className="mt-2 relative inline-block">
                                        <Image
                                            width={100}
                                            src={prevImage}
                                            alt="Preview"
                                            style={{ borderRadius: "8px", border: "1px solid #ccc" }}
                                        />
                                        <button
                                            type="button"
                                            onClick={clearPreview}
                                            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100"
                                        >
                                            <XCircle size={16} className="text-red-500" />
                                        </button>

                                    </div>
                                )}
                            </div>
                        </div>
                    </TabPane>
                    <TabPane key='2' tab="Course Infromation">
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className="text-xs text-gray-500 mb-1" >Course Title</label>
                                <Input className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm bg-gray-50 text-gray-700" placeholder='course title' name='courseName' onChange={handleValue} value={formData.courseName} />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1">Course Description</label>
                                <Input
                                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm bg-gray-50 text-gray-700"
                                    placeholder="Course Description"
                                    value={formData.CourseDescription}
                                    onChange={handleValue}
                                    name='CourseDescription'
                                />

                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1">Course Price</label>
                                <Input
                                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm bg-gray-50 text-gray-700"
                                    placeholder="Course Price"
                                    type="number"
                                    value={formData.CoursePrice}
                                    onChange={handleValue}
                                    name='CoursePrice'
                                />

                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1">Course Link</label>
                                <Input
                                    className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm bg-gray-50 text-gray-700"
                                    placeholder="Course Link"
                                    type="url"
                                    value={formData.CourseLink}
                                    onChange={handleValue}
                                    name='CourseLink'
                                />

                            </div>
                        </div>
                    </TabPane>
                </Tabs>
                <div className="flex justify-end space-x-3 mt-4">
                    <button
                        onClick={cancel}
                        className="border border-gray-300 text-gray-700 rounded-md px-4 py-2 text-sm"
                    >
                        Cancel
                    </button>
                    {activeKey === "1" ? (
                        <button
                            onClick={() => setActiveKey((parseInt(activeKey) + 1).toString())}
                            className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            className='rounded-md px-4 py-2 text-sm bg-blue-600 text-white'
                            onClick={handleSubmit}
                        >

                            {targetCourse ? 'Edit Course' : 'Add course'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CourseModal
