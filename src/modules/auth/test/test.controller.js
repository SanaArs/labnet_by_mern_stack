import Test from '../models/Test.model.js'; // Path check kar lein

export const createTest = async (req, res) => {
    try {
        const { testName, normalValueforFemale, normalValueforMale, description } = req.body;

        const newTest = new Test({
            testName,
            normalValueforFemale,
            normalValueforMale,
            description
        });

        await newTest.save();
        res.status(201).json({ message: "Test created successfully!", data: newTest });
    } catch (error) {
        res.status(500).json({ message: "Error creating test", error: error.message });
    }
};
export const getAllTests = async (req, res) => {
    try{
        const tests = await Test.find();
        res.status(200).json({ message: "Tests retrieved successfully!", data: tests });
    }catch (error) {
        res.status(500).json({ message: "Error retrieving tests", error: error.message });  
    };
 
};


