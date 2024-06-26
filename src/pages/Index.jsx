import { useState } from "react";
import { Box, Button, Checkbox, Container, FormControl, FormLabel, Heading, Input, Select, Textarea, VStack, Link } from "@chakra-ui/react";
import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";

const Index = () => {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("en");
  const [variables, setVariables] = useState({
    salutation: true,
    subjectline: false,
    spintax1: false,
    spintax2: false,
    spintax3: false,
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCheckboxChange = (event) => {
    setVariables({
      ...variables,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = () => {
    // Here you would typically handle the form submission to your backend API
    console.log("File:", file);
    console.log("Language:", language);
    console.log("Variables:", variables);
    alert("Check the console for output");
  };

  return (
    <Container maxW="container.xl" bgGradient="linear(to-r, gray.300, blue.400)" p={10} borderRadius="lg" boxShadow="base">
      <VStack spacing={6} align="stretch">
        <Heading>Craft the Perfect Cold Email</Heading>
        <FormControl>
          <FormLabel>Upload a CSV file</FormLabel>
          <Input type="file" accept=".csv" onChange={handleFileChange} borderColor="blue.500" _hover={{ borderColor: "blue.600" }} size="lg" variant="filled" p={2} bg="blue.500" color="white" _hover={{ bg: "blue.600" }} cursor="pointer" />
        </FormControl>
        <FormControl>
          <FormLabel>Select the language</FormLabel>
          <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="nl">Dutch</option>
            <option value="de">German</option>
          </Select>
        </FormControl>
        <Box>
          <Heading size="md">Select Variables</Heading>
          <Checkbox name="salutation" isChecked={variables.salutation} onChange={handleCheckboxChange}>
            Salutation
          </Checkbox>
          <Checkbox name="subjectline" isChecked={variables.subjectline} onChange={handleCheckboxChange}>
            Subjectline
          </Checkbox>
          <Checkbox name="spintax1" isChecked={variables.spintax1} onChange={handleCheckboxChange}>
            Spintax 1
          </Checkbox>
          <Checkbox name="spintax2" isChecked={variables.spintax2} onChange={handleCheckboxChange}>
            Spintax 2
          </Checkbox>
          <Checkbox name="spintax3" isChecked={variables.spintax3} onChange={handleCheckboxChange}>
            Spintax 3
          </Checkbox>
        </Box>
        <Button leftIcon={<FaDownload />} colorScheme="teal" onClick={handleSubmit} boxShadow="md" _hover={{ boxShadow: "lg" }}>
          Process
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
