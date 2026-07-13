declare
    l_user_message varchar2(4000);
    l_context      clob;
    l_bot_reply    clob;
begin
    l_user_message := apex_application.g_x01;

    -- Step 1: Retrieve relevant context using Oracle 23ai Vector Search
    select listagg(document_text, chr(10)) within group (order by vector_distance(embedding, 
           dbms_vector.encode(l_user_message)) asc)
      into l_context
      from (
        select document_text, embedding
          from knowledge_base_docs
         order by vector_distance(embedding, dbms_vector.encode(l_user_message)) asc
         fetch first 3 rows only
      );

    -- Step 2: Call LLM with context injected
    -- (Use the OpenAI example above, but prepend l_context to the system message)
    -- e.g., system content = 'Answer based on this context: ' || l_context

    apex_json.open_object;
    apex_json.write('message', l_bot_reply);
    apex_json.close_object;

exception
    when others then
        apex_json.open_object;
        apex_json.write('message', 'RAG query failed: ' || sqlerrm);
        apex_json.close_object;
end;
