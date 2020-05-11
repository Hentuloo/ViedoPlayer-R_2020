import React from 'react';
import { render, fireEvent } from 'tests/utils';
import '@testing-library/jest-dom/extend-expect';

import VideoEditor from 'components/VideoWithEditor';
import ToolsDefaultState from 'store/reducers/ToolsDefaultState';

describe('VideoEditor component', () => {
  it('can render with redux with defaults', () => {
    const { getByText } = render(<VideoEditor />, {});
    const toolMessage = ToolsDefaultState.items[0].data.content;

    expect(getByText(toolMessage)).toBeInTheDocument();
  });

  it('delete tool', async () => {
    const { getAllByTestId } = render(<VideoEditor />, {});
    const buttons = getAllByTestId('delete-tool');

    //delete
    const startLength = buttons.length;
    fireEvent.click(buttons[0]);

    //check new length
    const afterDelatingButtons = getAllByTestId('delete-tool');
    const afterDeleteLength = afterDelatingButtons.length;

    //check the difference
    expect(afterDeleteLength).toBe(startLength - 1);
  });
});
