import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss"
import { Button, Drawer, Input, Select } from 'antd'
import Header from './header';
import ArrowLeftOutlined from '@ant-design/icons/lib/icons/ArrowLeftOutlined';
import MinusOutlined from '@ant-design/icons/lib/icons/MinusOutlined';
import axios from 'axios';
export default function MainPage() {
    const [open, setOpen] = useState(false);
    const [selectedList, setSelectedList] = useState<string>('');
    const [addSchemaList, setAddSchemaList] = useState<any[]>([]);
    const [copyAddSchemaList, setCopyAddSchemaList] = useState<any>([]);


    const schemaList = [
        {
            value: 'first_name',
            label: 'First Name',
        },
        {
            value: 'last_name',
            label: 'Last Name',
        },
        {
            value: 'gender',
            label: 'Gender',
        },
        {
            value: 'age',
            label: 'Age',
        },
        {
            value: 'account_name',
            label: 'Account Name',
        },
        {
            value: 'city',
            label: 'City',
        },
        {
            value: 'state',
            label: 'State',
        }
    ];

    useState(() => {
        setCopyAddSchemaList(schemaList);
    })

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const setAddedSchema = (value: string) => {
        setSelectedList(value);
    };

    const addNewSchema = () => {
        if (selectedList !== '') {
            const newList = schemaList.filter((list) => selectedList === list.value);
            setAddSchemaList((prevList) => [...prevList, ...newList]);
            setSelectedList('');
        }
    };

    useEffect(() => {
        const newArray = schemaList.filter((item1) => !addSchemaList.some((item2) => item1.value === item2.value));
        setCopyAddSchemaList(newArray)
    }, [addSchemaList])

    const handleCancel = (e: any) => {
        const newList = addSchemaList.filter((list) => e !== list.value);
        setAddSchemaList(newList);
    }

    const selectedOnchage = (e: any) => {
        if (e !== '') {
            const newList = schemaList.filter((list) => e === list.value);
            setAddSchemaList((prevList) => [...prevList, ...newList]);
        }
    }


    const SaveAllData =  () => {
        const bodyArr: any =  addSchemaList?.map((list: any) => {
            return ({ [list.value]: list?.label })
        })

        const data = {
            "segment_name": "last_10_days_blog_visits",
            "schema": JSON.stringify(bodyArr)
        }
         // For Dummy api call
      axios.post('https://dummy/api/create', data).then((res: any)=>{
        console.log(res)
      }).catch((err: any)=>{
        console.log('errr::::', err)
      })
    }
   

    const handleSelectChange = (value: any, label: string) => {
        const updatedCopyAddSchemaList = addSchemaList.filter((item: any) => item.label !== label);    
        if (value !== "") {
          const selectedItem = schemaList.find((item: any) => item.value === value);
          if (selectedItem) {
            updatedCopyAddSchemaList.push(selectedItem);
          }
        }
        setAddSchemaList(updatedCopyAddSchemaList);
      };




    return (
        <>

            <div className={styles.mainPage}>


                <Header />
                <Button className={styles.saveBtn} onClick={showDrawer}>
                    Save Segment
                </Button>
                <Drawer
                    title="Saving Segment"
                    placement="right"
                    onClose={onClose}
                    closable={true}
                    closeIcon={<ArrowLeftOutlined twoToneColor="#fff" style={{ color: "#fff" }} />}
                    open={open}
                >
                    <div className={styles.drawerBody}>
                        <label>Enter the Name of the Segment </label>
                        <Input placeholder="Name of the segment" />
                        <label>To save your segment, you need to add the schemas to build the query.</label>
                        <ul className={styles.colorDots}>
                            <li><span className={styles.dotRed}></span>- User Traits</li>
                            <li><span className={styles.dotGreen}></span>- Group Traits</li>
                        </ul>

                        {addSchemaList?.length> 0 && <div className={styles.blueborder}>
                        {addSchemaList?.map((list: any) => {
                            return (
                                <div className={styles.segmentArea}>
                                    <span className={styles.dotRed}></span>
                                    <Select
                                        showSearch
                                        placeholder={list?.label}
                                        optionFilterProp="children"
                                        className="antSelect"
                                    onChange={(value) => handleSelectChange(value, list.label)}
                                    >
                                        {copyAddSchemaList?.map((data: any) => {
                                            if (data?.label !== list?.label) {
                                                return (
                                                    <><Select.Option value={data?.value}>{data?.label}</Select.Option></>
                                                )
                                            }
                                        })

                                        }
                                    </Select>
                                    <span className={styles.remove} onClick={() => handleCancel(list?.value)}><MinusOutlined /></span>
                                </div>
                                )
                        })}
                         </div> }
                              
                        <div className={styles.segmentArea}>
                            <span className={styles.dotRed}></span>
                            <Select
                                showSearch
                                placeholder="Add schema to segment"
                                value={selectedList !== "" ? selectedList : "Add schema to segment"}
                                optionFilterProp="children"
                                className="antSelect"
                                onChange={setAddedSchema}
                                options={copyAddSchemaList}
                            />
                            <span className={styles.remove}><MinusOutlined /></span>
                        </div>
                        


                        <span className={styles.addBtn} onClick={addNewSchema}>+ Add new schema</span>
                        <div className={styles.drawerFooter}>
                            <Button className={styles.btnGreen} onClick={SaveAllData}>Save the Segment</Button>
                            <Button className={styles.btnWhite}>Cancel</Button>
                        </div>
                    </div>
                </Drawer>
            </div>
        </>
    )
}
