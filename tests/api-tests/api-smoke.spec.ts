import { test } from '../../utils/fixtures';
import { expect } from '../../utils/custom-expect';
import testCasePostRequestPayload from '../../request-objects/test-cases/POST_test_case.json'
import testCaseDeleteRequestPayload from '../../request-objects/test-cases/DELETE_test_case.json'
import { getNewRandomTestCase } from 'utils/data-generator';

type TestCaseDeleteRequestPayload = {
    tcaseIds: string[];
};

test.use({ storageState: 'auth.json' });

test('Creation of a test case', async ({ api }) => {
    const newTestCaseResponse = await api
        .path('/project/TP/tcase')
        .body({
            type: 'standalone',
            folderId: 56,
            pos: null,
            title: 'test 13',
            priority: 'medium',
            comment: '',
            files: [],
            requirements: [],
            links: [],
            tags: [],
            steps: [],
            customFields: {},
            parameterValues: null,
            isDraft: false
        })
        .postRequest(201);
    expect(newTestCaseResponse).shouldMatchSchema('test-cases', 'POST_test_case')
    expect(newTestCaseResponse).toHaveProperty('id');
});

test('Creation and update of a test case', async ({ api }) => {
    const newTestCaseResponse = await api
        .path('/project/TP/tcase')
        .body({
            type: 'standalone',
            folderId: 56,
            pos: null,
            title: 'test 8',
            priority: 'medium',
            comment: '',
            files: [],
            requirements: [],
            links: [],
            tags: [],
            steps: [],
            customFields: {},
            parameterValues: null,
            isDraft: false
        })
        .postRequest(201);
    expect(newTestCaseResponse).toHaveProperty('id');
    const testCaseId = newTestCaseResponse.id;

    const updatedTestCaseResponse = await api
        .path(`/project/TP/tcase/${testCaseId}`)
        .body({
            type: 'standalone',
            folderId: 56,
            pos: null,
            title: 'test 8 updated',
            priority: 'medium',
            comment: '',
            files: [],
            requirements: [],
            links: [],
            tags: [],
            steps: [],
            customFields: {},
            parameterValues: null,
            isDraft: false
        })
        .patchRequest(200);
    expect(updatedTestCaseResponse).shouldMatchSchema('test-cases', 'PATCH_test_case')
    expect(updatedTestCaseResponse.message).toBe('Test case updated');
});

test('Creation and deletion of a test case', async ({ api }) => {
    const testCasePostRequest = getNewRandomTestCase()
    const newTestCaseResponse = await api
        .path('/project/TP/tcase')
        .body(testCasePostRequest)
        .postRequest(201);
    expect(newTestCaseResponse).toHaveProperty('id');
    const testCaseId = newTestCaseResponse.id;
    const testCaseDeleteRequestPayloadCasted = testCaseDeleteRequestPayload as TestCaseDeleteRequestPayload
    testCaseDeleteRequestPayloadCasted.tcaseIds.push(testCaseId)

    const deletedTestCaseResponse = await api.path(`/project/TP/tcase`).body(testCaseDeleteRequestPayload).deleteRequest(200);
    expect(deletedTestCaseResponse).shouldMatchSchema('test-cases', 'DELETE_test_case', true)
    expect(deletedTestCaseResponse).toHaveProperty('id')
})