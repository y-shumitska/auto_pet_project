import { test } from '../../utils/fixtures';
import { expect } from '../../utils/custom-expect';

test.use({ storageState: 'auth.json' });

test('Creation of a test case', async ({ api }) => {
    const newTestCaseResponse = await api
        .path('/project/TP/tcase')
        .body({
            type: 'standalone',
            folderId: 56,
            pos: null,
            title: 'test 7',
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
    console.log(testCaseId);

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
    expect(updatedTestCaseResponse.message).toBe('Test case updated');
});
