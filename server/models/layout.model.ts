import mongoose, { Document, Schema } from "mongoose";

interface FaqItem extends Document {
  question: string;
  answer: string;
}

interface Category extends Document {
  name: string;
}

interface BannerImage extends Document {
  public_id: string;
  url: string;
}

interface Layout extends Document {
    type: string;
    faq: FaqItem[];
    categories: Category[];
    banner: {
        image: BannerImage
        title: string;
        sutTitle: string;
    } 
}

const faqSchema = new Schema<FaqItem>({
    question: {type: String},
    answer: {type: String},
})

const categorySchema = new Schema<Category>({
    name: {type: String},
})

const bannerImageSchema = new Schema<BannerImage>({
    public_id: {type: String},
    url: {type: String},
})

const layoutSchema = new Schema<Layout>({
    type: {type: String},
    faq: [faqSchema],
    categories: [categorySchema],
    banner: {
        image: bannerImageSchema,
        title: {type: String},
        sutTitle: {type: String},
    }
}, {timestamps: true})

const LayoutModel = mongoose.model<Layout>("Layout", layoutSchema)

export default LayoutModel;

