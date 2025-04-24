document.addEventListener('DOMContentLoaded', function () {
    const conceptInput = document.getElementById('concept');
    const analysisInput = document.getElementById('analysis');
    const specificationInput = document.getElementById('specification');

    const programmingInput = document.getElementById('programming');
    const internalTestingInput = document.getElementById('internalTesting');
    const configurationInput = document.getElementById('configuration');
    const solutionDocumentationInput = document.getElementById('solutionDocumentation');
    const objectManagementInput = document.getElementById('objectManagement');

    const codeQualityControlInput = document.getElementById('codeQualityControl');
    const testingConfigurationInput = document.getElementById('testingConfiguration');
    const clientTestSupportInput = document.getElementById('clientTestSupport');
    const clientAcceptanceTestingInput = document.getElementById('clientAcceptanceTesting');
    const trainingInput = document.getElementById('training');
    const userManualInput = document.getElementById('userManual');

    const releaseCostInput = document.getElementById('releaseCost');
    const marginInput = document.getElementById('margin');
    const projectManagementInput = document.getElementById('projectManagement');
    const hourlyRateInput = document.getElementById('hourlyRate');

    const analysisResult = document.getElementById('analysisResult');
    const programmingResult = document.getElementById('programmingResult');
    const testingResult = document.getElementById('testingResult');
    const projectManagementResult = document.getElementById('projectManagementResult');
    const totalResult = document.getElementById('totalResult');
    const releaseCostResult = document.getElementById('releaseCostResult');
    const valuationResult = document.getElementById('valuationResult');

    const copyToJira1Button = document.getElementById('copyToJira1');
    const copyToJira2Button = document.getElementById('copyToJira2');

    function calculateResults() {
        const concept = parseFloat(conceptInput.value) || 0;
        const analysis = parseFloat(analysisInput.value) || 0;
        const specification = parseFloat(specificationInput.value) || 0;

        const programming = parseFloat(programmingInput.value) || 0;
        const internalTesting = parseFloat(internalTestingInput.value) || 0;
        const configuration = parseFloat(configurationInput.value) || 0;
        const solutionDocumentation = parseFloat(solutionDocumentationInput.value) || 0;
        const objectManagement = parseFloat(objectManagementInput.value) || 0;

        const codeQualityControl = parseFloat(codeQualityControlInput.value) || 0;
        const testingConfiguration = parseFloat(testingConfigurationInput.value) || 0;
        const clientTestSupport = parseFloat(clientTestSupportInput.value) || 0;
        const clientAcceptanceTesting = parseFloat(clientAcceptanceTestingInput.value) || 0;
        const training = parseFloat(trainingInput.value) || 0;
        const userManual = parseFloat(userManualInput.value) || 0;

        const releaseCost = parseFloat(releaseCostInput.value) || 0;
        const margin = parseFloat(marginInput.value) || 0;
        const projectManagement = parseFloat(projectManagementInput.value) || 0;
        const hourlyRate = parseFloat(hourlyRateInput.value) || 0;

        const analysisSum = concept + analysis + specification;
        const programmingSum = programming + internalTesting + configuration + solutionDocumentation + objectManagement;
        const testingSum = codeQualityControl + testingConfiguration + clientTestSupport + clientAcceptanceTesting + training + userManual;

        const marginMultiplier = 1 + (margin / 100);

        const analysisResultValue = Math.ceil(analysisSum * marginMultiplier);
        const programmingResultValue = Math.ceil(programmingSum * marginMultiplier);
        const testingResultValue = Math.ceil(testingSum * marginMultiplier);

        const totalSum = analysisSum + programmingSum + testingSum;
        const projectManagementResultValue = Math.ceil(totalSum * (projectManagement / 100));

        const total = analysisResultValue + programmingResultValue + testingResultValue + projectManagementResultValue;

        analysisResult.textContent = analysisResultValue;
        programmingResult.textContent = programmingResultValue;
        testingResult.textContent = testingResultValue;
        projectManagementResult.textContent = projectManagementResultValue;
        totalResult.textContent = total;
        releaseCostResult.textContent = releaseCost;
        valuationResult.textContent = total * hourlyRate;

        analysisResult.parentNode.title = `Concept (${concept}) + Analysis (${analysis}) + Specification (${specification}) * Margin (${margin}%)`;
        programmingResult.parentNode.title = `Programming (${programming}) + Internal Testing (${internalTesting}) + Configuration (${configuration}) + Solution Documentation (${solutionDocumentation}) + Object Management (${objectManagement}) * Margin (${margin}%)`;
        testingResult.parentNode.title = `Code Quality Control (${codeQualityControl}) + Testing Configuration (${testingConfiguration}) + Client Test Support (${clientTestSupport}) + Client Acceptance Testing (${clientAcceptanceTesting}) + Training (${training}) + User Manual (${userManual}) * Margin (${margin}%)`;
        projectManagementResult.parentNode.title = `(Analysis Sum + Programming Sum + Testing Sum) * Project Management (${projectManagement}%)`;
        totalResult.parentNode.title = `Analysis + Programming + Testing + Project Management`;
        releaseCostResult.parentNode.title = `Release Cost: ${releaseCost}`;
        valuationResult.parentNode.title = `Total * Hourly Rate (${hourlyRate})`;
    }

    function copyToClipboard(type) {
        let text = '';
        if (type === 'jira1') {
            text = `
||Category||Hours||
|Analysis|${analysisResult.textContent}|
|Programming|${programmingResult.textContent}|
|Testing|${testingResult.textContent}|
|Project Management|${projectManagementResult.textContent}|
|TOTAL|${totalResult.textContent}|
|Effort for Release on Additional Base|${releaseCostResult.textContent}|
|Valuation in PLN|${valuationResult.textContent}|
`;
        } else if (type === 'jira2') {
            text = `
||Field||Value||
|Concept|${conceptInput.value}|
|Analysis and Specification|${analysisInput.value}|
|FDD for the Developer|${specificationInput.value}|
|Programming|${programmingInput.value}|
|Internal Testing|${internalTestingInput.value}|
|Configuration|${configurationInput.value}|
|Solution Documentation|${solutionDocumentationInput.value}|
|Object Management|${objectManagementInput.value}|
|Code Quality Control|${codeQualityControlInput.value}|
|Testing and Configuration (Consultant)|${testingConfigurationInput.value}|
|Client Test Support (Developer)|${clientTestSupportInput.value}|
|Client Acceptance Testing|${clientAcceptanceTestingInput.value}|
|Training|${trainingInput.value}|
|User Manual|${userManualInput.value}|
|Release Cost for each additional base|${releaseCostInput.value}|
|Margin (%)|${marginInput.value}|
|Project Management (%)|${projectManagementInput.value}|
|Hourly Rate (PLN)|${hourlyRateInput.value}|
`;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                alert('Copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy to clipboard!');
            });
    }

    conceptInput.addEventListener('input', calculateResults);
    analysisInput.addEventListener('input', calculateResults);
    specificationInput.addEventListener('input', calculateResults);

    programmingInput.addEventListener('input', calculateResults);
    internalTestingInput.addEventListener('input', calculateResults);
    configurationInput.addEventListener('input', calculateResults);
    solutionDocumentationInput.addEventListener('input', calculateResults);
    objectManagementInput.addEventListener('input', calculateResults);

    codeQualityControlInput.addEventListener('input', calculateResults);
    testingConfigurationInput.addEventListener('input', calculateResults);
    clientTestSupportInput.addEventListener('input', calculateResults);
    clientAcceptanceTestingInput.addEventListener('input', calculateResults);
    trainingInput.addEventListener('input', calculateResults);
    userManualInput.addEventListener('input', calculateResults);

    releaseCostInput.addEventListener('input', calculateResults);
    marginInput.addEventListener('input', calculateResults);
    projectManagementInput.addEventListener('input', calculateResults);
    hourlyRateInput.addEventListener('input', calculateResults);

    copyToJira1Button.addEventListener('click', function() {
        copyToClipboard('jira1');
    });

    copyToJira2Button.addEventListener('click', function() {
        copyToClipboard('jira2');
    });

    calculateResults();
});
