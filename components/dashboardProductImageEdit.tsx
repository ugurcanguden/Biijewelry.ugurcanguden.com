import { ProductImageUpdateDto } from '@/common/dtos/productImageUpdateDto';
import { IResponseMessage, MessageType, ResponseMessage } from '@/common/models/common/response';
import { Products } from '@/common/models/product.model';
import { ProductImages } from '@/common/models/productImage.model';
import { APIService, APIServiceConfig } from '@/common/service/api.service';
import { setMessage } from '@/common/utils/message.service';
import { CheckOutlined, StarOutlined, UploadOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Layout, message, Popconfirm, Row, Upload, UploadFile } from 'antd';
import { useEffect, useState } from 'react';


export interface DashboardProductImageEditProps {
  product: Products,
  handleUpdateImageUrl: any
}

export default function DashboardProductImageEdit(dashboardProductImageEditProps: DashboardProductImageEditProps) {

  const [productImages, setProductImages] = useState<UploadFile[]>([]);
  const [removeProductImage, setRemoveProductImage] = useState<any>();
  const [showConfirm, setShowConfirm] = useState(false);
  const [product, setProduct] = useState<Products>();
  const [productId, setProductId] = useState("");


  function getProductId() { return dashboardProductImageEditProps?.product?.Id; }
  console.log(APIService.getApiCallCount())
  useEffect(() => {
    if (getProductId() != undefined && productId != getProductId()) {
      getProductByIdAsync();
      getProductImage();
      setProductId(getProductId); 
    }
  }, [])
  const saveFile = (e: any) => {
    if (e?.file?.status != undefined) {
      if (e.file.status == "removed") {

        if (isMainImage(e.file.url.toString())) {
          var res: IResponseMessage = new ResponseMessage;
          res.MessageType = MessageType.Error;
          res.Message = "Ürün resmi olarak seçilen resim silinemez.";
          setMessage(res);
          return;
        }
        setShowConfirm(true);
        setRemoveProductImage(e.file);
      }
      else if (e.file.status == "uploading") {
        uploadFile(e.file.originFileObj);
      }
    }
  };
  const confirm = async (e: any) => {
    removeFile();
    setShowConfirm(false);
  };

  const cancel = (e: any) => {
    setShowConfirm(false);
  };

  const isMainImage = (imageUrl: string): boolean => {
    return imageUrl.toString().includes(product?.ProductImagaUrl?.toString()!)
  }
  //#region 
  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("ProductId", getProductId());
    formData.append("File", file!);
    try {
      APIService.getInstance().httpPostMultiPartAxios("Product/UploadProductImageFile", formData).then((res) => {
        setMessage(res.Messages);
        getProductImage();
      })
        .catch(ex => {
          message.success("Beklenmedik bir hata oluştu.");
        });

    } catch (ex) {

    }
  };
  const removeFile = async () => {
    try {
      APIService.getInstance().httpDeleteAxios(`Product/DeleteProductImageAsync?productImageId=${removeProductImage?.uid?.toString()}`).then((res) => {
        setMessage(res.Messages);
        getProductImage();
      })
        .catch(ex => {
          message.success("Beklenmedik bir hata oluştu.");
        })
    } catch (ex) { }
  };
  const getProductByIdAsync = async () => {
    await APIService.getInstance().httpGetAxios(`Product/GetProductByIdAsync?productId=${getProductId()}`)
      .then(response => {
        setProduct(response.Data);
      })
      .catch(ex => { })
  }

  const getProductImage = async () => {
    APIService.getInstance().httpGetAxios(`Product/GetProductImagesByProductIdAsync?ProductId=${getProductId()}`)
      .then(response => {
        let item: UploadFile[] = [];
        response.Data.forEach((row: ProductImages) => {
          item.push(
            {
              name: row.OriginalName,
              fileName: row.ImagaUrl,
              uid: row.Id,
              url: APIServiceConfig.baseUrl + row.ImagaUrl,
              thumbUrl: APIServiceConfig.baseUrl + row.ImagaUrl 
            }
          );

        });
        setProductImages(item);
      })
      .catch(ex => {
      })
  }
  //#endregion

  //#region  Style ..
  const { Content, Footer } = Layout;

  const onChangeFavoriteImage = (data: any) => {
    let item: ProductImageUpdateDto = new ProductImageUpdateDto();
    item.Id = getProductId();
    item.ProductImagaUrl = data.fileName;
    try {
      setProductImages([]);
      APIService.getInstance().httpPutAxios("Product/UpdateProductImageUrlAsync", item).then(async (res) => {
        setMessage(res.Messages);
        await getProductByIdAsync();
        getProductImage();
        dashboardProductImageEditProps.handleUpdateImageUrl(data.url); 
      })
        .catch(ex => {
          message.success("Beklenmedik bir hata oluştu.");
        });

    } catch (ex) {
     
    }
  };

  //#endregion
  
  //#region  Service Call.
  


  //#endregion
  
  return (
    <Layout>
      <Layout>
        <Content  >
          <div className="site-layout-content" >
            <div style={{ textAlign: "center" }}>
              <Popconfirm
                title="Emin Misiniz?"
                description="Silmek istediğinize emin misiniz?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                open={showConfirm}
              >
              </Popconfirm>
            </div>
            <Upload
              listType="picture"
              onChange={saveFile}
              fileList={productImages}
              itemRender={
                (row, data) => {
                  return (
                    <Row key={row.key}>
                      <Col style={{ width: "92%" }}>
                        {row}
                      </Col>
                      <Col style={{ width: "8%" }} className="ant-upload-list-item ant-upload-list-item-undefined">
                        {!isMainImage(data.url?.toString()!) ?
                          <StarOutlined onClick={() => onChangeFavoriteImage(data)} />
                          :
                          <CheckOutlined />
                        }
                      </Col>
                    </Row>
                  )
                }
              }
            >
              {productImages.length < 5 ? <Button icon={<UploadOutlined />}>Resim Yükle</Button> :
                <Alert
                  banner
                  message="En fazla 5 adet resim yükleyebilirsiniz. Resim yüklemek veya değiştirmek için resim siliniz!"
                />
              }
            </Upload>

          </div>
        </Content>
      </Layout>
    </Layout>
  );

} 
