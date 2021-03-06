<div class="row">
  <div class="col-xs-12">
    <div class="panel panel-primary panel-admin">
      <div class="panel-heading">
        <h2>
        About T2Mongo Demo...
        </h2>
      </div>
      <div class="panel-body">
        <!-- Overview Details -->
        <h4>Overview</h4>
        <p>
        Showing how Teradata&reg;'s Query Grid&#8482; provides seamless multi-system analytics with our Unified Data Architecture&#8482;. By using the best-in-class analytic engine behind Teradata we can integrate with MongoDB to provide new insights and data value to a company.
        </p>
        <h4>Setting up QueryGrid</h4>
        <pre>
CREATE FOREIGN SERVER TD_SERVER_DB.Mongo USING
  hosttype('mongodb')
  remotehost('192.168.11.130')
  port(27017)
  tableopdebug(1)
DO IMPORT WITH SYSLIB.LOAD_FROM_MONGO
        </pre>
        <h4 id="history-title" style="margin: 0;cursor: pointer;">
          History <i class="fa fa-caret-up"></i>
        </h4>
        <div id="history-section" class="releases" style="font-size: 11px;display: none;">
          <div class="release">
            <h6>Version 1.0.0Alpha <span>(2015-06-01)</span>:</h6>
            <ul>
              <li>Initial release</li>
            </ul>
          </div>
        </div>
        <div style="text-align: center;">
          <a href="#/panel/quarterly" class="btn btn-lg btn-primary">Begin Demo</a>
        </div>
      </div>
    </div>
  </div>
</div>